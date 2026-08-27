const CLIENTS = [
  { id: "client-a", name: "클라이언트 A" },
  { id: "client-b", name: "클라이언트 B" },
];

const CHANNELS = [
  { id: "instagram", name: "Instagram", kind: "api" },
  { id: "facebook", name: "Facebook", kind: "api" },
  { id: "threads", name: "Threads", kind: "api" },
  { id: "x", name: "X", kind: "api" },
  { id: "tiktok", name: "TikTok", kind: "api" },
  { id: "youtube", name: "YouTube", kind: "api" },
  { id: "naver-blog", name: "네이버 블로그", kind: "manual" },
  { id: "naver-clip", name: "네이버 클립", kind: "manual" },
];

function getClient(id) {
  return CLIENTS.find((c) => c.id === id) || null;
}

function getChannel(id) {
  return CHANNELS.find((c) => c.id === id) || null;
}

module.exports = { CLIENTS, CHANNELS, getClient, getChannel };
