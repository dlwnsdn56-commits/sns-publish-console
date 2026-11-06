(function () {
  const views = {
    "/": "view-publish",
    "/jobs": "view-jobs",
    "/naver": "view-naver",
    "/analysis": "view-analysis",
  };

  function pathOf() {
    const p = location.pathname.replace(/\/+$/, "") || "/";
    return views[p] ? p : "/";
  }

  function showView() {
    const p = pathOf();
    Object.entries(views).forEach(([path, id]) => {
      document.getElementById(id).classList.toggle("hidden", path !== p);
    });
    document.querySelectorAll("nav a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("data-nav") === p);
    });
    if (p === "/jobs") loadJobs();
    if (p === "/naver") loadNaver();
    if (p === "/analysis") loadAnalysis();
  }

  window.addEventListener("popstate", showView);
  document.querySelectorAll("nav a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState({}, "", a.getAttribute("href"));
      showView();
    });
  });

  function badgeClass(status) {
    if (status === "발행됨(시뮬)") return "sim";
    if (status === "수동 대기") return "wait";
    if (status === "발행 중") return "busy";
    if (status === "완료") return "done";
    if (status.indexOf("실패") === 0) return "fail";
    return "";
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fmtTime(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return esc(iso);
    
    return d.toLocaleString("sv-SE", { timeZone: "Asia/Seoul" }).slice(0, 16);
  }

  async function loadMeta() {
    const res = await fetch("/api/meta");
    const data = await res.json();
    ["clientId", "analysisStore"].forEach((id) => {
      const sel = document.getElementById(id);
      data.clients.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        sel.appendChild(opt);
      });
    });
    document.getElementById("analysisStore").addEventListener("change", loadAnalysis);
    const box = document.getElementById("channels");
    data.channels.forEach((ch) => {
      const lab = document.createElement("label");
      lab.innerHTML =
        `<input type="checkbox" name="channel" value="${esc(ch.id)}" checked />` +
        `<span>${esc(ch.name)}</span>` +
        `<span class="kind">${ch.kind === "manual" ? "수동" : "API 스텁"}</span>`;
      box.appendChild(lab);
    });
  }

  function updateFileInput() {
    const type = document.querySelector("input[name=mediaType]:checked").value;
    const input = document.getElementById("files");
    const hint = document.getElementById("file-hint");
    if (type === "video") {
      input.accept = "video/*";
      input.multiple = false;
      hint.textContent = "영상 파일 1개를 선택하세요.";
    } else {
      input.accept = "image/*";
      input.multiple = true;
      hint.textContent = "카드뉴스 이미지를 여러 장 선택하세요.";
    }
  }

  document.querySelectorAll("input[name=mediaType]").forEach((el) => {
    el.addEventListener("change", updateFileInput);
  });
  updateFileInput();

  const form = document.getElementById("publish-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("publish-msg");
    const btn = document.getElementById("submit-btn");
    msg.className = "msg";
    msg.textContent = "";

    const clientId = document.getElementById("clientId").value;
    const mediaType = document.querySelector("input[name=mediaType]:checked").value;
    const files = document.getElementById("files").files;
    const caption = document.getElementById("caption").value;
    const scheduledAt = document.getElementById("scheduledAt").value || "";
    const channels = Array.from(document.querySelectorAll("input[name=channel]:checked")).map(
      (el) => el.value
    );

    if (!clientId) {
      msg.className = "msg err";
      msg.textContent = "클라이언트를 선택하세요.";
      return;
    }
    if (!files.length) {
      msg.className = "msg err";
      msg.textContent = "파일을 첨부하세요.";
      return;
    }
    if (mediaType === "video" && files.length !== 1) {
      msg.className = "msg err";
      msg.textContent = "영상은 파일 1개만 첨부하세요.";
      return;
    }
    if (channels.length === 0) {
      msg.className = "msg err";
      msg.textContent = "채널을 하나 이상 선택하세요.";
      return;
    }

    const fd = new FormData();
    fd.append("clientId", clientId);
    fd.append("mediaType", mediaType);
    fd.append("caption", caption);
    fd.append("scheduledAt", scheduledAt);
    fd.append("channels", JSON.stringify(channels));
    for (let i = 0; i < files.length; i++) fd.append("files", files[i]);

    btn.disabled = true;
    try {
      const res = await fetch("/api/jobs", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        msg.className = "msg err";
        msg.textContent = data.error || "등록 실패";
        return;
      }
      msg.className = "msg ok";
      msg.textContent = "작업을 등록했습니다. 작업 목록에서 채널별 상태를 확인하세요.";
      form.reset();
      document.querySelector("input[name=mediaType][value=video]").checked = true;
      document.querySelectorAll("input[name=channel]").forEach((el) => {
        el.checked = true;
      });
      updateFileInput();
      history.pushState({}, "", "/jobs");
      showView();
    } catch (err) {
      msg.className = "msg err";
      msg.textContent = "네트워크 오류";
    } finally {
      btn.disabled = false;
    }
  });

  async function loadJobs() {
    const box = document.getElementById("jobs-table");
    box.innerHTML = "<p class='empty'>불러오는 중…</p>";
    const res = await fetch("/api/jobs");
    const data = await res.json();
    if (!data.jobs.length) {
      box.innerHTML = "<p class='empty'>아직 작업이 없습니다. 새 발행에서 등록하세요.</p>";
      return;
    }
    const rows = data.jobs
      .map((job) => {
        const tasks = (job.tasks || [])
          .map(
            (t) =>
              `<span class="badge ${badgeClass(t.status)}">${esc(t.channelName)} · ${esc(t.status)}</span>`
          )
          .join("");
        const files = (job.files || []).map((f) => esc(f.originalName)).join(", ");
        const media = job.mediaType === "video" ? "영상" : "카드뉴스";
        return `<tr>
          <td>${esc(job.clientName)}<div class="files">${fmtTime(job.createdAt)}</div></td>
          <td>${media}<div class="files">${files}</div></td>
          <td><div class="caption">${esc(job.caption) || "—"}</div>
            <div class="files">예약: ${job.scheduledAt ? esc(job.scheduledAt) : "즉시"}</div></td>
          <td><div class="task-list">${tasks}</div></td>
        </tr>`;
      })
      .join("");
    box.innerHTML = `<table>
      <thead><tr><th>클라이언트</th><th>미디어</th><th>캡션</th><th>채널 상태</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;

    const busy = data.jobs.some((j) => (j.tasks || []).some((t) => t.status === "발행 중"));
    if (busy) setTimeout(loadJobs, 800);
  }

  async function loadNaver() {
    const box = document.getElementById("naver-list");
    box.innerHTML = "<p class='empty'>불러오는 중…</p>";
    const res = await fetch("/api/naver-queue");
    const data = await res.json();
    if (!data.tasks.length) {
      box.innerHTML = "<p class='empty'>수동 대기 중인 네이버 작업이 없습니다.</p>";
      return;
    }
    box.innerHTML = data.tasks
      .map((t) => {
        const files = (t.files || []).map((f) => esc(f.originalName)).join(", ") || "—";
        return `<div class="naver-item" data-id="${esc(t.id)}">
          <h3>${esc(t.channelName)} · ${esc(t.clientName)}</h3>
          <div class="meta">등록 ${fmtTime(t.createdAt)} · 상태 ${esc(t.status)} · ${t.mediaType === "video" ? "영상" : "카드뉴스"}</div>
          <div class="caption">${esc(t.caption) || "(캡션 없음)"}</div>
          <div class="files" style="margin:8px 0">파일: ${files}</div>
          <button type="button" class="complete-btn" data-id="${esc(t.id)}">완료</button>
        </div>`;
      })
      .join("");
    box.querySelectorAll(".complete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        btn.disabled = true;
        const res = await fetch(`/api/tasks/${btn.getAttribute("data-id")}/complete`, {
          method: "POST",
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert(data.error || "완료 처리 실패");
          btn.disabled = false;
          return;
        }
        loadNaver();
      });
    });
  }

  let analysisSeq = 0;

  function accountText(account) {
    if (!account) return "계정 정보 없음";
    const bits = [];
    if (account.displayName) bits.push(account.displayName);
    if (account.handle) bits.push(account.handle);
    if (account.id) bits.push("id " + account.id);
    return bits.join(" · ") || "계정 정보 없음";
  }

  function connectionBadge(connection) {
    if (!connection) return "muted";
    if (connection.code === "reconnect") return "reconnect";
    if (connection.code === "not_connected") return "wait";
    if (connection.code === "connected") return "done";
    return "muted";
  }

  function renderAnalysis(box, data) {
    const cacheLine = !data.cache
      ? ""
      : data.cache.ok
        ? data.cache.present
          ? "제공자 캐시 파일을 읽었습니다."
          : "제공자 캐시 파일이 없습니다."
        : `제공자 캐시를 사용하지 않았습니다. ${esc(data.cache.error || "")}`;
    const channels = (data.channels || [])
      .map((ch) => {
        const statuses = Object.entries(ch.console.byStatus || {})
          .map(
            ([status, count]) =>
              `<span class="badge ${badgeClass(status)}">${esc(status)} ${esc(count)}</span>`
          )
          .join(" ");
        const metricRows = (ch.metrics || [])
          .map((metric) => {
            const value =
              metric.state === "available" ? esc(metric.value) : "값 없음";
            const unit = metric.unit ? ` ${esc(metric.unit)}` : "";
            const definition = metric.definition ? esc(metric.definition) : "정의 없음";
            const state = metric.state === "available" ? "확인된 값" : "값 없음";
            return `<tr>
              <td>${esc(metric.key)}</td>
              <td>${value}${metric.state === "available" ? unit : ""}</td>
              <td>${definition}</td>
              <td>${state}</td>
            </tr>`;
          })
          .join("");
        const metricsBlock = metricRows
          ? `<table>
              <thead><tr><th>지표</th><th>값</th><th>정의</th><th>상태</th></tr></thead>
              <tbody>${metricRows}</tbody>
            </table>`
          : `<p class="metric-note">표시할 제공자 지표 항목이 없습니다.</p>`;
        const review =
          ch.review && ch.review.code === "pending_review"
            ? `<span class="badge wait">${esc(ch.review.label)}</span>`
            : `<span class="badge muted">${esc(ch.review ? ch.review.label : "검토 상태 없음")}</span>`;
        return `<div class="channel-block">
          <h3>${esc(ch.channelName)}</h3>
          <div class="kv">
            <span class="badge ${connectionBadge(ch.connection)}">${esc(ch.connection.label)}</span>
            ${review}
          </div>
          <div class="kv">계정 ${esc(accountText(ch.account))}</div>
          <div class="kv">제공자 데이터 시각 ${fmtTime(ch.providerFetchedAt)}</div>
          <div class="kv">최근 발행 작업 시각 ${fmtTime(ch.console.lastTaskAt)}</div>
          <div class="kv">이 가게의 발행 작업 ${esc(ch.console.taskCount)}건</div>
          <div class="task-list">${statuses}</div>
          <p class="metric-note">${esc(ch.providerStateReason || "")}</p>
          ${metricsBlock}
        </div>`;
      })
      .join("");
    box.innerHTML = `
      <p class="kv">이 화면을 만든 시각 ${fmtTime(data.generatedAt)}</p>
      <p class="kv">${cacheLine}</p>
      <p>${esc(data.summary ? data.summary.text : "")}</p>
      ${channels || "<p class='empty'>표시할 채널이 없습니다.</p>"}
    `;
  }

  async function loadAnalysis() {
    const seq = ++analysisSeq;
    const box = document.getElementById("analysis-body");
    const storeId = document.getElementById("analysisStore").value;
    if (!storeId) {
      box.innerHTML = "<p class='empty'>가게를 선택하세요.</p>";
      return;
    }
    box.innerHTML = "<p class='empty'>불러오는 중…</p>";
    try {
      const res = await fetch(`/api/stores/${encodeURIComponent(storeId)}/channel-analysis`);
      const data = await res.json().catch(() => ({}));
      if (seq !== analysisSeq) return;
      if (!res.ok) {
        box.innerHTML = `<p class="msg err">${esc(data.error || "분석을 불러오지 못했습니다")}</p>`;
        return;
      }
      renderAnalysis(box, data);
    } catch (err) {
      if (seq !== analysisSeq) return;
      box.innerHTML = "<p class='msg err'>네트워크 오류</p>";
    }
  }

  loadMeta().then(showView).catch((err) => {
    document.getElementById("publish-msg").className = "msg err";
    document.getElementById("publish-msg").textContent = "서버에 연결할 수 없습니다.";
    console.error(err);
  });
})();
