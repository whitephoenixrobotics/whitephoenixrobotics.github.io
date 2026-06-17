// ---- Config ----
const OWNER = "whitephoenixrobotics";
const REPO  = "PhoenixNest";
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

// The PhoenixNest installer asset (e.g. PhoenixNest-Setup-0.1.0.exe).
function isInstaller(name) {
  const n = name.toLowerCase();
  return n.endsWith(".exe") && !n.includes("uninstall");
}

async function loadRelease() {
  const meta = document.getElementById("release-meta");
  const dlMain = document.getElementById("dl-main");
  const dlHero = document.getElementById("dl-hero");
  const verEl = document.getElementById("dl-version");
  const sizeEl = document.getElementById("dl-size");
  try {
    const res = await fetch(API, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    const installer = (data.assets || []).find((a) => isInstaller(a.name));
    const ver = data.tag_name || data.name || "";

    if (installer) {
      const url = installer.browser_download_url;
      if (dlMain) { dlMain.href = url; dlMain.removeAttribute("target"); }
      if (dlHero) { dlHero.href = url; }
      if (sizeEl) sizeEl.textContent = "~" + fmtSize(installer.size);
    } else {
      if (dlMain) dlMain.href = RELEASES_PAGE;
      if (dlHero) dlHero.href = RELEASES_PAGE;
    }

    if (verEl) verEl.textContent = ver;
    if (meta) {
      meta.innerHTML = ver
        ? `เวอร์ชันล่าสุด <b>${ver}</b> · Windows 10/11 (64-bit) · ฟรี`
        : `Windows 10/11 (64-bit) · ฟรี`;
    }
  } catch (err) {
    // Fallback: point everything at the Releases page.
    if (dlMain) dlMain.href = RELEASES_PAGE;
    if (dlHero) dlHero.href = RELEASES_PAGE;
    if (meta) meta.innerHTML =
      `เปิดดาวน์โหลดได้ที่ <a href="${RELEASES_PAGE}" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline">หน้า Releases</a>`;
  }
}

loadRelease();
