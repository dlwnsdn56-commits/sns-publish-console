const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");
const test = require("node:test");
const assert = require("node:assert/strict");

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sns-analysis-"));
process.env.SNS_DATA_DIR = tmp;
process.env.SNS_INSIGHTS_CACHE = path.join(tmp, "channel-insights-cache.json");

const { CHANNELS } = require("../lib/channels");
const {
  ADAPTER_INSIGHTS,
  buildStoreAnalysis,
  selectStoreCache,
  readCacheFile,
} = require("../lib/channel-analysis");
const { app } = require("../server");

const B_CAPTION = "B-CAPTION-SECRET";
const B_HANDLE = "B-HANDLE-SECRET";
const B_METRIC = 99991;
const TOKEN = "TOKEN-SHOULD-NOT-LEAK";
const RESULT_SECRET = "A-RESULT-SECRET";
const BANNED = ["성장", "증가", "감소", "추세", "전월", "전주", "상승", "하락"];

const cacheStores = {
  "client-a": {
    channels: {
      youtube: {
        account: {
          id: "yt-account-a",
          displayName: "가게A유튜브",
          handle: "@store-a",
          accessToken: TOKEN,
        },
        connectionStatus: "connected",
        fetchedAt: "2026-03-01T00:00:00.000Z",
        metrics: {
          views: { value: null, definition: "제공자가 비워 둔 조회 값" },
          likes: { value: 0, definition: "좋아요 수" },
          shares: { value: "0", definition: "문자열 영" },
        },
      },
      instagram: {
        connectionStatus: "reconnect_required",
        reviewStatus: "pending_review",
        account: null,
        fetchedAt: "not-a-date",
        metrics: {},
      },
      tiktok: {
        connectionStatus: "reconnect_required",
        account: { handle: "@tiktok-a" },
        fetchedAt: "2026-03-02T00:00:00.000Z",
        metrics: {
          video_views: { value: 0, definition: "캐시에 있는 동영상 조회 값" },
        },
      },
    },
  },
  "client-b": {
    channels: {
      youtube: {
        account: { handle: B_HANDLE },
        metrics: { views: { value: B_METRIC, definition: "B 전용 정의" } },
      },
    },
  },
};

function jobs() {
  return [
    {
      id: "job-a",
      clientId: "client-a",
      caption: "A-CAPTION",
      tasks: [
        {
          channel: "youtube",
          status: "발행됨(시뮬)",
          createdAt: "2026-02-01T01:00:00.000Z",
          result: { message: RESULT_SECRET },
          secret: RESULT_SECRET,
        },
        { channel: null, status: "상태 없음 원본", createdAt: null },
      ],
    },
    {
      id: "job-b",
      clientId: "client-b",
      caption: B_CAPTION,
      tasks: [
        { channel: "instagram", status: "발행됨(시뮬)", createdAt: "2026-02-02T00:00:00.000Z" },
        { channel: "instagram", status: "실패(시뮬)", createdAt: "2026-02-03T00:00:00.000Z" },
        { channel: "youtube", status: "발행됨(시뮬)", createdAt: "2026-02-04T00:00:00.000Z" },
        { channel: "youtube", status: "발행됨(시뮬)", createdAt: "2026-02-05T00:00:00.000Z" },
        { channel: "youtube", status: "발행됨(시뮬)", createdAt: "2026-02-06T00:00:00.000Z" },
      ],
    },
  ];
}

function analysisFor(storeId, storeName) {
  return buildStoreAnalysis({
    store: { id: storeId, name: storeName },
    channels: CHANNELS,
    jobs: jobs(),
    cacheEntry: selectStoreCache(cacheStores, storeId),
    cacheStatus: { present: true, ok: true },
    generatedAt: "2026-04-01T00:00:00.000Z",
  });
}

function collectNumbers(value, out = []) {
  if (typeof value === "number") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectNumbers(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectNumbers(item, out));
  }
  return out;
}

function channelOf(analysis, id) {
  return analysis.channels.find((channel) => channel.channelId === id);
}

function metricOf(channel, key) {
  return channel.metrics.find((metric) => metric.key === key);
}

test("repository adapters do not implement insights", () => {
  for (const channel of CHANNELS) {
    const row = ADAPTER_INSIGHTS.find((item) => item.channelId === channel.id);
    assert.ok(row, channel.id);
    assert.equal(row.insightsImplemented, false);
    assert.equal(fs.existsSync(path.join(__dirname, "..", row.source)), true);
  }
  for (const name of ["instagram", "facebook", "threads", "x", "tiktok", "youtube"]) {
    const adapter = require(`../adapters/${name}`);
    assert.equal(typeof adapter.publish, "function");
    assert.equal(adapter.insights, undefined);
    assert.equal(adapter.fetchInsights, undefined);
  }
  const files = [];
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      if (name === "node_modules" || name === ".git" || name === "test") continue;
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (/\.(js|json|md|html|css)$/.test(name)) files.push(full);
    }
  };
  walk(path.join(__dirname, ".."));
  const blob = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");
  assert.equal(blob.includes("INSIGHTS_META_ENABLED"), false);
});

test("other store records and secrets stay out of the analysis", () => {
  const analysis = analysisFor("client-a", "클라이언트 A");
  const blob = JSON.stringify(analysis);
  assert.equal(blob.includes(B_CAPTION), false);
  assert.equal(blob.includes(B_HANDLE), false);
  assert.equal(blob.includes("B 전용 정의"), false);
  assert.equal(blob.includes(TOKEN), false);
  assert.equal(blob.includes(RESULT_SECRET), false);
  assert.equal(blob.includes("A-CAPTION"), false);
  assert.equal(collectNumbers(analysis).includes(B_METRIC), false);
  assert.equal(analysis.storeId, "client-a");
  assert.equal(analysis.summary.consoleTaskCount, 2);
  assert.equal(channelOf(analysis, "youtube").console.taskCount, 1);
  assert.equal(channelOf(analysis, "instagram").console.taskCount, 0);
  assert.equal(channelOf(analysis, "").console.taskCount, 1);
});

test("null metrics stay null and numeric zero stays zero", () => {
  const analysis = analysisFor("client-a", "클라이언트 A");
  const youtube = channelOf(analysis, "youtube");
  const views = metricOf(youtube, "views");
  const likes = metricOf(youtube, "likes");
  const shares = metricOf(youtube, "shares");
  assert.equal(views.value, null);
  assert.equal(views.state, "unavailable");
  assert.equal(views.definition, "제공자가 비워 둔 조회 값");
  assert.equal(likes.value, 0);
  assert.equal(likes.state, "available");
  assert.equal(likes.definition, "좋아요 수");
  assert.equal(shares.value, null);
  assert.equal(shares.unavailableReason, "숫자 값이 아닙니다");
  assert.equal(metricOf(youtube, "comments"), undefined);
  assert.equal(
    analysis.summary.availableMetrics.some((metric) => metric.key === "views"),
    false
  );
  assert.equal(analysis.summary.nullMetrics.find((metric) => metric.key === "views").value, null);
  assert.equal(analysis.summary.text.includes("YouTube likes 0"), true);
  assert.equal(analysis.summary.text.includes("YouTube views"), false);
  assert.equal(analysis.summary.text.includes("shares"), false);

  const tiktok = channelOf(analysis, "tiktok");
  assert.equal(tiktok.connection.code, "reconnect");
  assert.equal(metricOf(tiktok, "video_views").value, 0);
  assert.equal(tiktok.account.handle, "@tiktok-a");
  assert.equal(tiktok.providerFetchedAt, "2026-03-02T00:00:00.000Z");

  const instagram = channelOf(analysis, "instagram");
  assert.equal(instagram.connection.code, "reconnect");
  assert.equal(instagram.review.code, "pending_review");
  assert.equal(instagram.account, null);
  assert.equal(instagram.providerFetchedAt, null);
  assert.deepEqual(instagram.metrics, []);
  assert.equal(instagram.console.taskCount, 0);
  assert.equal(instagram.insightsImplemented, false);

  assert.equal(youtube.account.accessToken, undefined);
  assert.equal(youtube.account.handle, "@store-a");
  assert.equal(youtube.providerFetchedAt, "2026-03-01T00:00:00.000Z");
  assert.equal(analysis.generatedAt, "2026-04-01T00:00:00.000Z");
  assert.notEqual(analysis.generatedAt, youtube.providerFetchedAt);
});

test("summary uses only numbers present for that store", () => {
  const analysis = analysisFor("client-a", "클라이언트 A");
  for (const word of BANNED) {
    assert.equal(analysis.summary.text.includes(word), false, word);
  }
  assert.equal(analysis.summary.availableMetrics.length, 2);
  assert.deepEqual(
    analysis.summary.availableMetrics.map((metric) => [metric.channelId, metric.key, metric.value]),
    [
      ["tiktok", "video_views", 0],
      ["youtube", "likes", 0],
    ]
  );
  assert.equal(analysis.summary.nullMetrics.length, 2);
  assert.equal(analysis.summary.text.includes("발행 작업은 2건입니다"), true);
  assert.equal(analysis.summary.text.includes("숫자 값이 없는 제공자 지표 2개"), true);

  const other = analysisFor("client-b", "클라이언트 B");
  assert.equal(other.summary.consoleTaskCount, 5);
  assert.equal(channelOf(other, "youtube").console.taskCount, 3);
  assert.equal(channelOf(other, "instagram").console.taskCount, 2);
  assert.equal(metricOf(channelOf(other, "youtube"), "views").value, B_METRIC);
  assert.equal(JSON.stringify(other).includes("@store-a"), false);
  assert.equal(JSON.stringify(other).includes("가게A유튜브"), false);
  assert.equal(other.summary.text.includes(String(B_METRIC)), true);
  assert.equal(other.summary.text.includes("likes 0"), false);
  for (const word of BANNED) assert.equal(other.summary.text.includes(word), false);
});

test("missing cache leaves provider metrics empty and keeps a real task count of zero", () => {
  const analysis = buildStoreAnalysis({
    store: { id: "client-a", name: "클라이언트 A" },
    channels: CHANNELS,
    jobs: [],
    cacheEntry: null,
    cacheStatus: { present: false, ok: true },
    generatedAt: "2026-04-01T00:00:00.000Z",
  });
  assert.equal(analysis.cache.present, false);
  assert.equal(analysis.summary.consoleTaskCount, 0);
  assert.equal(analysis.summary.text.includes("발행 작업은 0건입니다"), true);
  assert.equal(analysis.summary.text.includes("확인할 수 있는 숫자는 없습니다"), true);
  assert.equal(analysis.summary.availableMetrics.length, 0);
  for (const channel of analysis.channels) {
    assert.equal(channel.insightsImplemented, false);
    assert.deepEqual(channel.metrics, []);
    assert.equal(channel.account, null);
    assert.equal(channel.connection.code, "no_account");
    assert.equal(channel.providerFetchedAt, null);
    assert.equal(channel.console.taskCount, 0);
    assert.equal(JSON.stringify(channel).includes('"value":0'), false);
  }
});

test("cache reader rejects invalid files without inventing metrics", () => {
  const missing = readCacheFile(path.join(tmp, "missing-cache.json"));
  assert.equal(missing.present, false);
  assert.equal(missing.ok, true);
  assert.deepEqual(missing.stores, {});

  const broken = path.join(tmp, "broken.json");
  fs.writeFileSync(broken, "{", "utf8");
  const invalid = readCacheFile(broken);
  assert.equal(invalid.ok, false);
  assert.deepEqual(invalid.stores, {});

  assert.equal(selectStoreCache(cacheStores, "client-a").channels.youtube.account.handle, "@store-a");
  assert.equal(selectStoreCache(cacheStores, "missing"), null);
  assert.equal(selectStoreCache(cacheStores, "client-b").channels.youtube.account.handle, B_HANDLE);
});

test("http analysis is store scoped", async (t) => {
  fs.writeFileSync(
    path.join(tmp, "jobs.json"),
    JSON.stringify({
      jobs: [
        {
          id: "job-a",
          clientId: "client-a",
          clientName: "클라이언트 A",
          caption: "A-CAPTION",
          createdAt: "2026-02-01T00:00:00.000Z",
          mediaType: "images",
          files: [],
          scheduledAt: null,
        },
        {
          id: "job-b",
          clientId: "client-b",
          clientName: "클라이언트 B",
          caption: B_CAPTION,
          createdAt: "2026-02-02T00:00:00.000Z",
          mediaType: "images",
          files: [],
          scheduledAt: null,
        },
      ],
      tasks: [
        {
          id: "task-a",
          jobId: "job-a",
          channel: "youtube",
          channelName: "YouTube",
          kind: "api",
          status: "발행됨(시뮬)",
          createdAt: "2026-02-01T01:00:00.000Z",
          result: { message: RESULT_SECRET },
        },
        {
          id: "task-b",
          jobId: "job-b",
          channel: "instagram",
          channelName: "Instagram",
          kind: "api",
          status: "발행됨(시뮬)",
          createdAt: "2026-02-02T03:00:00.000Z",
          result: { message: B_CAPTION },
        },
      ],
    }),
    "utf8"
  );
  fs.writeFileSync(
    process.env.SNS_INSIGHTS_CACHE,
    JSON.stringify({ stores: cacheStores }),
    "utf8"
  );

  const server = app.listen(0, "127.0.0.1");
  t.after(
    () =>
      new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      })
  );
  await new Promise((resolve) => server.once("listening", resolve));
  const port = server.address().port;

  async function getJson(urlPath) {
    return new Promise((resolve, reject) => {
      http
        .get({ hostname: "127.0.0.1", port, path: urlPath }, (res) => {
          let body = "";
          res.on("data", (chunk) => {
            body += chunk;
          });
          res.on("end", () => {
            resolve({ status: res.statusCode, json: JSON.parse(body), raw: body });
          });
        })
        .on("error", reject);
    });
  }

  const leaked = await getJson(
    "/api/stores/client-a/channel-analysis?storeId=client-b&include=all"
  );
  assert.equal(leaked.status, 200);
  assert.equal(leaked.json.storeId, "client-a");
  assert.equal(leaked.raw.includes(B_CAPTION), false);
  assert.equal(leaked.raw.includes(B_HANDLE), false);
  assert.equal(leaked.raw.includes(TOKEN), false);
  assert.equal(leaked.raw.includes(RESULT_SECRET), false);
  assert.equal(leaked.raw.includes(String(B_METRIC)), false);
  assert.equal(leaked.json.stores, undefined);
  const httpYoutube = channelOf(leaked.json, "youtube");
  assert.equal(metricOf(httpYoutube, "likes").value, 0);
  assert.equal(metricOf(httpYoutube, "views").value, null);
  assert.equal(httpYoutube.console.taskCount, 1);
  assert.equal(channelOf(leaked.json, "instagram").console.taskCount, 0);
  assert.equal(leaked.json.summary.text.includes("발행 작업은 1건입니다"), true);
  assert.equal(leaked.json.summary.text.includes("YouTube views"), false);
  assert.equal(metricOf(httpYoutube, "views").state, "unavailable");

  const other = await getJson("/api/stores/client-b/channel-analysis");
  assert.equal(other.status, 200);
  assert.equal(other.json.storeId, "client-b");
  assert.equal(other.raw.includes("@store-a"), false);
  assert.equal(other.raw.includes("가게A유튜브"), false);
  assert.equal(other.raw.includes(RESULT_SECRET), false);
  assert.equal(metricOf(channelOf(other.json, "youtube"), "views").value, B_METRIC);
  assert.equal(channelOf(other.json, "youtube").console.taskCount, 0);
  assert.equal(channelOf(other.json, "instagram").console.taskCount, 1);
  assert.equal(other.json.summary.consoleTaskCount, 1);

  const missing = await getJson("/api/stores/client-c/channel-analysis");
  assert.equal(missing.status, 404);

  fs.rmSync(process.env.SNS_INSIGHTS_CACHE);
  const empty = await getJson("/api/stores/client-a/channel-analysis");
  assert.equal(empty.status, 200);
  assert.equal(empty.json.cache.present, false);
  assert.equal(channelOf(empty.json, "youtube").metrics.length, 0);
  assert.equal(channelOf(empty.json, "youtube").console.taskCount, 1);
  assert.equal(empty.json.summary.text.includes("확인할 수 있는 숫자는 없습니다"), true);
  assert.equal(empty.raw.includes(String(B_METRIC)), false);
  assert.equal(empty.raw.includes('"value":0'), false);
});
