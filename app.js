// ---- Config ----
const OWNER = "whitephoenixrobotics";
const REPO  = "PhoenixFlow-Releases";
const API   = `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`;
const RELEASES_PAGE = `https://github.com/${OWNER}/${REPO}/releases/latest`;

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle (simple)
document.querySelector(".nav-toggle")?.addEventListener("click", () => {
  document.querySelector(".nav-links")?.classList.toggle("open");
});

function fmtSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return (mb / 1024).toFixed(2) + " GB";
  return mb.toFixed(0) + " MB";
}

function editionOf(name) {
  const n = name.toLowerCase();
  return (n.includes("gpu") || n.includes("cuda")) ? "gpu" : "cpu";
}

// The clickable installer (small nsis-web downloader).
function isInstaller(name) {
  const n = name.toLowerCase();
  return n.endsWith(".exe") && !n.includes("uninstall");
}

// The real payload that gets pulled during install — its size is what matters.
function isPayload(name) {
  return name.toLowerCase().endsWith(".nsis.7z");
}

function setEdition(edition, installer, payloadSize) {
  const links = document.querySelectorAll(`[data-edition="${edition}"]`);
  const note  = document.querySelector(`[data-size="${edition}"]`);
  links.forEach((a) => {
    a.href = installer.browser_download_url;
    a.removeAttribute("data-disabled");
  });
  // payloadSize = size downloaded during install; fall back to installer size.
  const size = payloadSize || installer.size;
  if (note) note.textContent = `ดาวน์โหลดตอนติดตั้ง ~${fmtSize(size)}`;
}

function markUnavailable(edition) {
  const links = document.querySelectorAll(`[data-edition="${edition}"]`);
  const note  = document.querySelector(`[data-size="${edition}"]`);
  links.forEach((a) => { a.href = RELEASES_PAGE; a.target = "_blank"; a.rel = "noopener"; });
  if (note) note.textContent = "ยังไม่มีไฟล์รุ่นนี้ — ดูที่หน้า Releases";
}

async function loadRelease() {
  const meta = document.getElementById("release-meta");
  try {
    const res = await fetch(API, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    const assets = data.assets || [];
    const installers = { cpu: null, gpu: null };
    const payloads   = { cpu: 0, gpu: 0 };
    for (const a of assets) {
      const ed = editionOf(a.name);
      if (isInstaller(a.name) && !installers[ed]) installers[ed] = a;
      if (isPayload(a.name)) payloads[ed] += a.size; // sum split parts if any
    }

    if (installers.cpu) setEdition("cpu", installers.cpu, payloads.cpu); else markUnavailable("cpu");
    if (installers.gpu) setEdition("gpu", installers.gpu, payloads.gpu); else markUnavailable("gpu");

    const ver = data.tag_name || data.name || "";
    if (meta) {
      meta.innerHTML = ver
        ? `เวอร์ชันล่าสุด <b>${ver}</b> · Windows 10/11 (64-bit)`
        : `Windows 10/11 (64-bit)`;
    }
  } catch (err) {
    // Fallback: point everything at the Releases page.
    markUnavailable("cpu");
    markUnavailable("gpu");
    if (meta) meta.innerHTML =
      `เปิดดาวน์โหลดได้ที่ <a href="${RELEASES_PAGE}" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline">หน้า Releases</a>`;
  }
}

loadRelease();
