const fs = require("fs");
const path = require("path");

function dataDir() {
  return process.env.SNS_DATA_DIR || path.join(__dirname, "..", "data");
}

function storePath() {
  return path.join(dataDir(), "jobs.json");
}

function ensure() {
  const dir = dataDir();
  const file = storePath();
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({ jobs: [], tasks: [] }, null, 2), "utf8");
  }
}

function read() {
  ensure();
  const raw = fs.readFileSync(storePath(), "utf8");
  try {
    const data = JSON.parse(raw);
    if (!data.jobs) data.jobs = [];
    if (!data.tasks) data.tasks = [];
    return data;
  } catch {
    return { jobs: [], tasks: [] };
  }
}

function write(data) {
  ensure();
  const file = storePath();
  const tmp = file + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, file);
}

function getJobs() {
  const data = read();
  return data.jobs
    .map((job) => ({
      ...job,
      tasks: data.tasks.filter((t) => t.jobId === job.id),
    }))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

function getJob(id) {
  return getJobs().find((j) => j.id === id) || null;
}

function addJob(job, tasks) {
  const data = read();
  data.jobs.push(job);
  data.tasks.push(...tasks);
  write(data);
  return getJob(job.id);
}

function updateTask(taskId, patch) {
  const data = read();
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task) return null;
  Object.assign(task, patch);
  write(data);
  return task;
}

function getNaverQueue() {
  const data = read();
  const jobsById = Object.fromEntries(data.jobs.map((j) => [j.id, j]));
  return data.tasks
    .filter(
      (t) =>
        (t.channel === "naver-blog" || t.channel === "naver-clip") &&
        t.status === "수동 대기"
    )
    .map((t) => {
      const job = jobsById[t.jobId];
      return {
        ...t,
        clientId: job ? job.clientId : null,
        clientName: job ? job.clientName : "",
        caption: job ? job.caption : "",
        files: job ? job.files : [],
        mediaType: job ? job.mediaType : null,
        scheduledAt: job ? job.scheduledAt : null,
        createdAt: job ? job.createdAt : t.createdAt,
      };
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

module.exports = {
  getJobs,
  getJob,
  addJob,
  updateTask,
  getNaverQueue,
};
