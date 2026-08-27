const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const STORE_PATH = path.join(DATA_DIR, "jobs.json");

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(
      STORE_PATH,
      JSON.stringify({ jobs: [], tasks: [] }, null, 2),
      "utf8"
    );
  }
}

function read() {
  ensure();
  const raw = fs.readFileSync(STORE_PATH, "utf8");
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
  const tmp = STORE_PATH + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, STORE_PATH);
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
