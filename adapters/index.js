const instagram = require("./instagram");
const facebook = require("./facebook");
const threads = require("./threads");
const x = require("./x");
const tiktok = require("./tiktok");
const youtube = require("./youtube");

const adapters = {
  instagram,
  facebook,
  threads,
  x,
  tiktok,
  youtube,
};

/**
 * Call a stub adapter. Never hits a real social API.
 * Short delay simulates network latency.
 */
async function publishViaAdapter(channelId, payload) {
  const adapter = adapters[channelId];
  if (!adapter) {
    return { ok: false, simulated: true, channel: channelId, message: "어댑터 없음" };
  }
  const delayMs = 400 + Math.floor(Math.random() * 800);
  await new Promise((r) => setTimeout(r, delayMs));
  return adapter.publish(payload);
}

module.exports = { adapters, publishViaAdapter };
