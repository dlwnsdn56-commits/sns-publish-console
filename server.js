const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");

const store = require("./lib/store");
const { CLIENTS, CHANNELS, getClient, getChannel } = require("./lib/channels");
const { publishViaAdapter } = require("./adapters");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const UPLOAD_DIR = path.join(__dirname, "uploads");

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").slice(0, 12);
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024, files: 20 },
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(UPLOAD_DIR));

app.get("/api/meta", (_req, res) => {
  res.json({ clients: CLIENTS, channels: CHANNELS });
});

app.get("/api/jobs", (_req, res) => {
  res.json({ jobs: store.getJobs() });
});

app.get("/api/jobs/:id", (req, res) => {
  const job = store.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: "작업을 찾을 수 없습니다." });
  res.json({ job });
});

app.get("/api/naver-queue", (_req, res) => {
  res.json({ tasks: store.getNaverQueue() });
});

app.post("/api/jobs", upload.array("files", 20), (req, res) => {
  try {
    const clientId = String(req.body.clientId || "");
    const client = getClient(clientId);
    if (!client) {
      return res.status(400).json({ error: "클라이언트를 선택하세요." });
    }

    const mediaType = String(req.body.mediaType || "");
    if (mediaType !== "video" && mediaType !== "images") {
      return res.status(400).json({ error: "미디어 유형을 선택하세요. (영상 또는 카드뉴스)" });
    }

    const caption = String(req.body.caption || "");
    const scheduledAt = req.body.scheduledAt ? String(req.body.scheduledAt) : null;

    let channelIds = req.body.channels || [];
    if (typeof channelIds === "string") {
      try {
        channelIds = JSON.parse(channelIds);
      } catch {
        channelIds = channelIds.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
    if (!Array.isArray(channelIds) || channelIds.length === 0) {
      return res.status(400).json({ error: "채널을 하나 이상 선택하세요." });
    }

    const files = (req.files || []).map((f) => ({
      originalName: f.originalname,
      storedName: f.filename,
      mimeType: f.mimetype,
      size: f.size,
    }));

    if (files.length === 0) {
      return res.status(400).json({ error: "영상 1개 또는 이미지(카드뉴스)를 첨부하세요." });
    }

    if (mediaType === "video") {
      if (files.length !== 1) {
        return res.status(400).json({ error: "영상은 파일 1개만 첨부하세요." });
      }
      const mime = files[0].mimeType || "";
      if (!mime.startsWith("video/") && !/\.(mp4|mov|webm|mkv|m4v)$/i.test(files[0].originalName)) {
        return res.status(400).json({ error: "영상 파일을 첨부하세요." });
      }
    } else {
      const bad = files.find(
        (f) =>
          !(f.mimeType || "").startsWith("image/") &&
          !/\.(png|jpe?g|gif|webp|bmp)$/i.test(f.originalName)
      );
      if (bad) {
        return res.status(400).json({ error: "카드뉴스는 이미지만 첨부하세요." });
      }
    }

    const selected = [];
    for (const id of channelIds) {
      const ch = getChannel(id);
      if (!ch) return res.status(400).json({ error: `알 수 없는 채널: ${id}` });
      selected.push(ch);
    }

    const now = new Date().toISOString();
    const jobId = crypto.randomUUID();
    const job = {
      id: jobId,
      clientId: client.id,
      clientName: client.name,
      caption,
      scheduledAt,
      mediaType,
      files,
      createdAt: now,
    };

    const tasks = selected.map((ch) => ({
      id: crypto.randomUUID(),
      jobId,
      channel: ch.id,
      channelName: ch.name,
      kind: ch.kind,
      status: ch.kind === "manual" ? "수동 대기" : "발행 중",
      createdAt: now,
      completedAt: null,
      result: null,
    }));

    store.addJob(job, tasks);

    const apiTasks = tasks.filter((t) => t.kind === "api");
    for (const task of apiTasks) {
      publishViaAdapter(task.channel, {
        clientId: job.clientId,
        caption: job.caption,
        files: job.files,
        scheduledAt: job.scheduledAt,
      })
        .then((result) => {
          store.updateTask(task.id, {
            status: "발행됨(시뮬)",
            completedAt: new Date().toISOString(),
            result,
          });
        })
        .catch((err) => {
          store.updateTask(task.id, {
            status: "실패(시뮬)",
            completedAt: new Date().toISOString(),
            result: { ok: false, simulated: true, message: String(err && err.message) },
          });
        });
    }

    res.status(201).json({ job: store.getJob(jobId) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "작업 생성 중 오류가 발생했습니다." });
  }
});

app.post("/api/tasks/:id/complete", (req, res) => {
  const dataJobs = store.getJobs();
  let found = null;
  for (const job of dataJobs) {
    found = job.tasks.find((t) => t.id === req.params.id);
    if (found) break;
  }
  if (!found) return res.status(404).json({ error: "작업을 찾을 수 없습니다." });
  if (found.kind !== "manual") {
    return res.status(400).json({ error: "수동 채널만 완료 처리할 수 있습니다." });
  }
  if (found.status !== "수동 대기") {
    return res.status(400).json({ error: "이미 처리된 작업입니다." });
  }
  const updated = store.updateTask(found.id, {
    status: "완료",
    completedAt: new Date().toISOString(),
    result: { ok: true, simulated: false, message: "운영자가 수동 발행 완료로 표시" },
  });
  res.json({ task: updated });
});

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`SNS 발행 콘솔 실행 중 http://${HOST}:${PORT}`);
  console.log(`로컬: http://localhost:${PORT}`);
});
