const fs = require("fs");

/**
 * Provider insights are not implemented in this repository.
 * Adapters only export a simulated publish(). There is no insights
 * client, no OAuth account store, and no metric catalog with definitions.
 * Numbers are shown only when a cache record already contains them.
 */
const ADAPTER_INSIGHTS = [
  {
    channelId: "instagram",
    source: "adapters/instagram.js",
    insightsImplemented: false,
    reason: "adapters/instagram.js 는 발행 스텁입니다. 인사이트 조회 함수, 계정 저장, 지표 정의가 없습니다.",
  },
  {
    channelId: "facebook",
    source: "adapters/facebook.js",
    insightsImplemented: false,
    reason: "adapters/facebook.js 는 발행 스텁입니다. 인사이트 조회 함수, 계정 저장, 지표 정의가 없습니다.",
  },
  {
    channelId: "threads",
    source: "adapters/threads.js",
    insightsImplemented: false,
    reason: "adapters/threads.js 는 발행 스텁입니다. 인사이트 조회 함수, 계정 저장, 지표 정의가 없습니다.",
  },
  {
    channelId: "x",
    source: "adapters/x.js",
    insightsImplemented: false,
    reason: "adapters/x.js 는 발행 스텁입니다. 인사이트 조회 함수, 계정 저장, 지표 정의가 없습니다.",
  },
  {
    channelId: "tiktok",
    source: "adapters/tiktok.js",
    insightsImplemented: false,
    reason: "adapters/tiktok.js 는 발행 스텁입니다. 인사이트 조회 함수, 계정 저장, 지표 정의가 없습니다.",
  },
  {
    channelId: "youtube",
    source: "adapters/youtube.js",
    insightsImplemented: false,
    reason: "adapters/youtube.js 는 발행 스텁입니다. 인사이트 조회 함수, 계정 저장, 지표 정의가 없습니다.",
  },
  {
    channelId: "naver-blog",
    source: "lib/channels.js",
    insightsImplemented: false,
    reason: "네이버 블로그는 lib/channels.js 에서 수동 채널입니다. 조회 지표를 가져오는 코드가 없습니다.",
  },
  {
    channelId: "naver-clip",
    source: "lib/channels.js",
    insightsImplemented: false,
    reason: "네이버 클립은 lib/channels.js 에서 수동 채널입니다. 조회 지표를 가져오는 코드가 없습니다.",
  },
];

const SUPPORT_BY_ID = Object.fromEntries(ADAPTER_INSIGHTS.map((row) => [row.channelId, row]));

const KNOWN_CONNECTION = new Set(["connected", "reconnect_required", "not_connected"]);
const MAX_TEXT = 500;
const MAX_CACHE_BYTES = 1024 * 1024;

function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function cleanText(value) {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text) return null;
  return text.slice(0, MAX_TEXT);
}

function validTime(value) {
  const text = cleanText(value);
  if (!text) return null;
  const time = new Date(text).getTime();
  if (!Number.isFinite(time)) return null;
  return new Date(time).toISOString();
}

function supportFor(channelId) {
  return (
    SUPPORT_BY_ID[channelId] || {
      channelId,
      source: null,
      insightsImplemented: false,
      reason: "이 채널의 인사이트 조회 코드가 저장소에 없습니다.",
    }
  );
}

function accountIdentity(account) {
  if (!isPlainObject(account)) return null;
  const id = cleanText(account.id) || (finiteNumber(account.id) ? String(account.id) : null);
  const displayName = cleanText(account.displayName);
  const handle = cleanText(account.handle) || cleanText(account.username);
  if (!id && !displayName && !handle) return null;
  return { id, displayName, handle };
}

function connectionState(entry, account) {
  const raw = entry && typeof entry.connectionStatus === "string" ? entry.connectionStatus.trim() : "";
  if (raw === "reconnect_required") {
    return { code: "reconnect", label: "재연결 필요" };
  }
  if (raw === "not_connected") {
    return { code: "not_connected", label: "연결되지 않음" };
  }
  if (raw === "connected" && account) {
    return { code: "connected", label: "연결 계정 확인" };
  }
  if (raw === "connected" && !account) {
    return { code: "connected_without_identity", label: "연결로 표시되어 있으나 계정 식별자가 없습니다" };
  }
  if (account && raw && !KNOWN_CONNECTION.has(raw)) {
    return { code: "identity_only", label: "계정 식별자는 있으나 연결 상태는 확인된 값이 아닙니다" };
  }
  if (account) {
    return { code: "identity_only", label: "계정 식별자만 저장되어 있습니다" };
  }
  return { code: "no_account", label: "계정 정보 없음" };
}

function reviewState(entry) {
  const raw = entry && typeof entry.reviewStatus === "string" ? entry.reviewStatus.trim() : "";
  if (raw === "pending_review") {
    return { code: "pending_review", label: "검토 대기" };
  }
  if (!raw) return { code: "not_stated", label: "검토 상태 없음" };
  return { code: "stated", label: raw.slice(0, 80) };
}

function metricRow(key, raw) {
  const base = {
    key,
    value: null,
    state: "unavailable",
    definition: null,
    unit: null,
    unavailableReason: "값이 없습니다",
  };
  if (raw == null) return base;
  if (finiteNumber(raw)) {
    return {
      key,
      value: raw,
      state: "available",
      definition: null,
      unit: null,
      unavailableReason: null,
    };
  }
  if (typeof raw !== "object" || Array.isArray(raw)) {
    return { ...base, unavailableReason: "숫자 값이 아닙니다" };
  }
  const definition = cleanText(raw.definition);
  const unit = cleanText(raw.unit);
  if (!Object.prototype.hasOwnProperty.call(raw, "value") || raw.value == null) {
    return { ...base, definition, unit, unavailableReason: "값이 없습니다" };
  }
  if (!finiteNumber(raw.value)) {
    return { ...base, definition, unit, unavailableReason: "숫자 값이 아닙니다" };
  }
  return {
    key,
    value: raw.value,
    state: "available",
    definition,
    unit,
    unavailableReason: null,
  };
}

function metricsFromEntry(entry) {
  if (!entry || !isPlainObject(entry.metrics)) return [];
  const rows = [];
  for (const key of Object.keys(entry.metrics)) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
    const safeKey = cleanText(key);
    if (!safeKey) continue;
    rows.push(metricRow(safeKey, entry.metrics[key]));
  }
  return rows;
}

function tasksForStore(jobs, storeId) {
  const tasks = [];
  for (const job of jobs || []) {
    if (!job || job.clientId !== storeId) continue;
    for (const task of job.tasks || []) {
      if (!task) continue;
      tasks.push(task);
    }
  }
  return tasks;
}

function sameChannel(task, channelId) {
  if (channelId === "") return !task.channel;
  return task.channel === channelId;
}

function consoleStats(tasks, channelId) {
  const matched = tasks.filter((task) => sameChannel(task, channelId));
  const byStatus = {};
  let lastTaskAt = null;
  let lastMs = null;
  for (const task of matched) {
    const status = cleanText(task.status) || "상태 없음";
    byStatus[status] = (byStatus[status] || 0) + 1;
    const iso = validTime(task.createdAt);
    if (!iso) continue;
    const ms = new Date(iso).getTime();
    if (lastMs == null || ms > lastMs) {
      lastMs = ms;
      lastTaskAt = iso;
    }
  }
  return {
    taskCount: matched.length,
    byStatus,
    lastTaskAt,
  };
}

function channelDescriptor(channel, tasks, entry) {
  const support = supportFor(channel.id);
  const account = entry ? accountIdentity(entry.account) : null;
  const metrics = metricsFromEntry(entry);
  const availableCount = metrics.filter((row) => row.state === "available").length;
  let providerState = "unavailable";
  let providerStateReason = support.reason;
  if (!support.insightsImplemented && availableCount > 0) {
    providerState = "cache_only";
    providerStateReason = `${support.reason} 표시 중인 숫자는 캐시에 저장된 값입니다. 이 저장소 코드가 제공자 API를 조회한 결과는 아닙니다.`;
    if (metrics.some((row) => row.state !== "available")) {
      providerStateReason += " 숫자 값이 없는 항목은 0으로 바꾸지 않았습니다.";
    }
  } else if (availableCount > 0) {
    providerState = "available";
    providerStateReason = null;
  } else if (entry && metrics.some((row) => row.state === "unavailable")) {
    providerStateReason = `${support.reason} 캐시에 키가 있으나 숫자 값이 없는 항목은 0으로 바꾸지 않았습니다.`;
  }
  return {
    channelId: channel.id,
    channelName: channel.name,
    kind: channel.kind || null,
    source: support.source,
    insightsImplemented: support.insightsImplemented === true,
    providerState,
    providerStateReason,
    account,
    connection: connectionState(entry, account),
    review: reviewState(entry),
    providerFetchedAt: entry ? validTime(entry.fetchedAt) : null,
    console: consoleStats(tasks, channel.id),
    metrics,
  };
}

function buildSummary(storeName, channels) {
  const consoleTaskCount = channels.reduce((sum, channel) => sum + channel.console.taskCount, 0);
  const available = [];
  const nullMetrics = [];
  for (const channel of channels) {
    for (const metric of channel.metrics) {
      const fact = {
        channelId: channel.channelId,
        channelName: channel.channelName,
        key: metric.key,
        value: metric.value,
        definition: metric.definition,
        unit: metric.unit,
      };
      if (metric.state === "available") available.push(fact);
      else nullMetrics.push({ ...fact, unavailableReason: metric.unavailableReason });
    }
  }
  const parts = [`${storeName}의 채널 분석입니다.`];
  parts.push(`이 가게로 기록된 발행 작업은 ${consoleTaskCount}건입니다.`);
  if (available.length === 0) {
    parts.push("제공자 지표에서 확인할 수 있는 숫자는 없습니다.");
  } else {
    const bits = available.map((metric) => {
      const definition = metric.definition ? `정의: ${metric.definition}` : "정의 없음";
      const unit = metric.unit ? ` ${metric.unit}` : "";
      return `${metric.channelName} ${metric.key} ${metric.value}${unit} (${definition})`;
    });
    parts.push(`확인된 제공자 지표는 ${bits.join(", ")} 입니다.`);
  }
  if (nullMetrics.length > 0) {
    parts.push(`숫자 값이 없는 제공자 지표 ${nullMetrics.length}개는 합산에 넣지 않았습니다.`);
  }
  parts.push("표시 값은 이 가게의 발행 기록과 캐시에 있는 숫자입니다.");
  return {
    text: parts.join(" "),
    consoleTaskCount,
    availableMetrics: available,
    nullMetrics,
  };
}

function orderedChannels(catalog, tasks, entry) {
  const known = Array.isArray(catalog) ? catalog : [];
  const seen = new Set();
  const rows = [];
  for (const channel of known) {
    if (!channel || !channel.id || seen.has(channel.id)) continue;
    seen.add(channel.id);
    rows.push({ id: channel.id, name: channel.name || channel.id, kind: channel.kind || null });
  }
  const extras = new Set();
  let unlabeled = false;
  for (const task of tasks) {
    if (!task.channel) {
      unlabeled = true;
      continue;
    }
    if (!seen.has(task.channel)) extras.add(task.channel);
  }
  if (entry && isPlainObject(entry.channels)) {
    for (const key of Object.keys(entry.channels)) {
      if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
      if (!seen.has(key)) extras.add(key);
    }
  }
  for (const id of Array.from(extras).sort()) {
    rows.push({ id, name: id, kind: null });
  }
  if (unlabeled) rows.push({ id: "", name: "채널 없음", kind: null });
  return rows;
}

function buildStoreAnalysis({ store, channels, jobs, cacheEntry, cacheStatus, generatedAt }) {
  if (!store || !store.id) {
    throw new Error("store id is required");
  }
  const tasks = tasksForStore(jobs, store.id);
  const entry = isPlainObject(cacheEntry) ? cacheEntry : null;
  const descriptors = orderedChannels(channels, tasks, entry).map((channel) => {
    const channelEntry =
      entry && isPlainObject(entry.channels) && isPlainObject(entry.channels[channel.id])
        ? entry.channels[channel.id]
        : null;
    return channelDescriptor(channel, tasks, channelEntry);
  });
  const status = cacheStatus || { present: false, ok: true, error: null };
  return {
    storeId: store.id,
    storeName: store.name || store.id,
    tenantKey: "clientId",
    generatedAt: validTime(generatedAt) || new Date().toISOString(),
    cache: {
      present: status.present === true,
      ok: status.ok !== false,
      error: status.ok === false ? cleanText(status.error) || "캐시를 읽지 못했습니다" : null,
    },
    summary: buildSummary(store.name || store.id, descriptors),
    channels: descriptors,
  };
}

function selectStoreCache(cacheStores, storeId) {
  if (!isPlainObject(cacheStores)) return null;
  if (!Object.prototype.hasOwnProperty.call(cacheStores, storeId)) return null;
  const entry = cacheStores[storeId];
  if (!isPlainObject(entry)) return null;
  return entry;
}

function readCacheFile(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    return { present: false, ok: true, error: null, stores: {} };
  }
  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch (err) {
    return { present: true, ok: false, error: "캐시 파일을 확인하지 못했습니다", stores: {} };
  }
  if (!stat.isFile()) {
    return { present: true, ok: false, error: "캐시 경로가 파일이 아닙니다", stores: {} };
  }
  if (stat.size > MAX_CACHE_BYTES) {
    return { present: true, ok: false, error: "캐시 파일이 너무 커서 읽지 않았습니다", stores: {} };
  }
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    return { present: true, ok: false, error: "캐시 JSON을 해석하지 못했습니다", stores: {} };
  }
  if (!isPlainObject(parsed)) {
    return { present: true, ok: false, error: "캐시 JSON 형식이 객체가 아닙니다", stores: {} };
  }
  const stores = isPlainObject(parsed.stores) ? parsed.stores : {};
  return { present: true, ok: true, error: null, stores };
}

module.exports = {
  ADAPTER_INSIGHTS,
  buildStoreAnalysis,
  selectStoreCache,
  readCacheFile,
  metricRow,
};
