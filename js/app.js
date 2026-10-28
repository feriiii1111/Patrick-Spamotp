/* PatrickStar Spam OTP — Real Proxy Version */

const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("dropdown");
const docsBtn = document.getElementById("docsBtn");
const apikeyBtn = document.getElementById("apikeyBtn");
const docsModal = document.getElementById("docsModal");
const closeDocs = document.getElementById("closeDocs");
const spamBtn = document.getElementById("spamBtn");
const consoleEl = document.getElementById("console");
const clearConsole = document.getElementById("clearConsole");
const targetSelect = document.getElementById("targetSelect");
const batchPhone = document.getElementById("batchPhone");
const batchText = document.getElementById("batchText");

let stats = { success: 0, rate: 0, bad: 0, error: 0 };
let running = false;

if (menuBtn) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });
  document.addEventListener("click", () => dropdown.classList.remove("show"));
}

if (docsBtn) {
  docsBtn.addEventListener("click", () => {
    dropdown.classList.remove("show");
    const list = document.getElementById("endpointList");
    if (list) {
      list.innerHTML = ENDPOINTS.map(e =>
        `<div><span>#${e.id}</span> ${e.name} — ${e.url}</div>`
      ).join("");
    }
    docsModal.classList.add("show");
  });
}
if (closeDocs) closeDocs.addEventListener("click", () => docsModal.classList.remove("show"));
if (docsModal) {
  docsModal.addEventListener("click", (e) => {
    if (e.target === docsModal) docsModal.classList.remove("show");
  });
}

if (apikeyBtn) {
  apikeyBtn.addEventListener("click", () => {
    dropdown.classList.remove("show");
    log("info", `API Key aktif: ${API_KEY}`);
    log("info", "Header: X-API-KEY: Patrick");
  });
}

if (clearConsole) {
  clearConsole.addEventListener("click", () => { consoleEl.innerHTML = ""; });
}

function ts() {
  return new Date().toTimeString().slice(0, 8);
}

function log(type, msg) {
  if (!consoleEl) return;
  const line = document.createElement("div");
  line.className = `log-line log-${type}`;
  line.innerHTML = `<span class="log-time">[${ts()}]</span>${msg}`;
  consoleEl.appendChild(line);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

function updateStats() {
  const map = { statSuccess: "success", statRate: "rate", statBad: "bad", statError: "error" };
  for (const [id, key] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) el.textContent = stats[key];
  }
}

function getPhones() {
  const phones = [];
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`phone${i}`);
    if (el) {
      const v = el.value.trim();
      if (v) phones.push(v);
    }
  }
  return phones;
}

function getTargetIds() {
  if (!targetSelect) return "all";
  const val = targetSelect.value;
  if (val === "all") return "all";
  return [parseInt(val)];
}

async function callProxy(phone, targets) {
  const res = await fetch("/api/spam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY
    },
    body: JSON.stringify({ phone, targets, key: API_KEY })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

async function runSpam() {
  if (running) return;
  const phones = getPhones();
  if (phones.length === 0) {
    log("error", "Masukkan minimal 1 nomor HP");
    return;
  }

  const targets = getTargetIds();
  running = true;
  spamBtn.disabled = true;
  spamBtn.innerHTML = `<svg class="spin" viewBox="0 0 24 24" style="width:22px;height:22px;fill:#fff"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg> Running...`;

  log("info", `═══ REAL PROXY | ${phones.length} nomor ═══`);

  for (let i = 0; i < phones.length; i++) {
    const phone = phones[i];
    if (batchPhone) batchPhone.textContent = phone;
    if (batchText) {
      batchText.innerHTML = `<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--yellow)"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg> Batch ${i + 1} running`;
    }

    log("info", `→ Proxy call | ${phone}`);

    try {
      const data = await callProxy(phone, targets);

      for (const r of data.results) {
        if (r.status === "success") {
          stats.success++;
          log("success", `✓ ${r.name} → ${r.code} OK`);
        } else if (r.status === "rate") {
          stats.rate++;
          log("warn", `⚠ ${r.name} → ${r.code} Rate Limit`);
        } else if (r.status === "bad") {
          stats.bad++;
          log("warn", `✗ ${r.name} → ${r.code} Bad Request`);
        } else {
          stats.error++;
          log("error", `✗ ${r.name} → ${r.code || "ERR"} ${r.msg || ""}`);
        }
        updateStats();
      }

      log("success", `── Batch ${i + 1} selesai: ${phone} | S:${data.summary.success} R:${data.summary.rate} B:${data.summary.bad} E:${data.summary.error} ──`);
    } catch (err) {
      stats.error++;
      updateStats();
      log("error", `Proxy error: ${err.message}`);
    }

    if (batchText) {
      batchText.innerHTML = `<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--green)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Batch ${i + 1} selesai`;
    }
  }

  log("info", `═══ Selesai | S:${stats.success} R:${stats.rate} B:${stats.bad} E:${stats.error} ═══`);
  running = false;
  spamBtn.disabled = false;
  spamBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Request OTP`;
}

if (spamBtn) spamBtn.addEventListener("click", runSpam);

log("info", "PatrickStar REAL PROXY ready");
log("info", `API Key: ${API_KEY} | endpoint: /api/spam`);
updateStats();
