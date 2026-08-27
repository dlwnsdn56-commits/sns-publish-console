/**
 * Threads API adapter (stub).
 * Real OAuth + thread create can be wired here later.
 */
async function publish({ clientId, caption, files, scheduledAt }) {
  return {
    ok: true,
    simulated: true,
    channel: "threads",
    message: "Threads 발행 시뮬레이트됨 (실 API 호출 없음)",
    meta: { clientId, captionLength: (caption || "").length, fileCount: files.length, scheduledAt },
  };
}

module.exports = { publish, name: "threads" };
