(() => {
  "use strict";

  function resolveRoot() {
    if (typeof window.PROTOTYPE_ROOT === "string") return window.PROTOTYPE_ROOT;
    if (typeof window.DOCS_NAV_ROOT === "string") return window.DOCS_NAV_ROOT;
    const script = document.currentScript;
    if (script && script.src) {
      try {
        const u = new URL(script.src, location.href);
        return u.pathname.replace(/assets\/docs-nav\.js$/, "");
      } catch (_) { /* ignore */ }
    }
    return "./";
  }

  const ROOT = resolveRoot();
  const hub = (path) => ROOT.replace(/\/?$/, "/") + path.replace(/^\.\//, "");

  const GLOBAL_LINKS = [
    { href: hub("guide/index.html"), title: "目的別ナビ", desc: "資料の入口" },
    { href: hub("strategy/index.html"), title: "ポートフォリオ方針", desc: "案A統合・3レイヤー" },
    { href: hub("requirements/index.html"), title: "要件書 v2", desc: "構造・SEO・KW" },
    { href: hub("business/site-map/index.html"), title: "案Aサイトマップ", desc: "幹構造" },
    { href: hub("business/index.html"), title: "/business トップ", desc: "画面プロトタイプ" },
    { href: hub("business/index.html#confirmed-modules"), title: "確定6モジュール", desc: "共通カリキュラム一覧" },
    { href: hub("business/ai-agent-development/index.html"), title: "AIエージェント開発", desc: "確定6を束ねる代表候補" },
    { href: hub("SEO_POLICY.md"), title: "SEO方針", desc: "index制御" },
    { href: hub("archive/index.html"), title: "アーカイブ", desc: "v1スナップショット" },
    { href: hub("../index.html"), title: "ダッシュボード", desc: "着金シミュ" }
  ];

  function pageSections() {
    const nodes = Array.from(document.querySelectorAll("[data-docs-nav], .toc a[href^='#'], .section-card[id], .nav a[href^='#']"));
    const seen = new Set();
    const out = [];
    nodes.forEach((el) => {
      let href = el.getAttribute("href") || "";
      let title = (el.textContent || "").trim().replace(/\s+/g, " ");
      if (el.hasAttribute("data-docs-nav")) {
        href = el.getAttribute("href") || ("#" + (el.id || ""));
        title = el.getAttribute("data-docs-nav") || title;
      } else if (el.id && el.classList.contains("section-card")) {
        href = "#" + el.id;
        const h2 = el.querySelector("h2");
        title = h2 ? h2.textContent.trim() : el.id;
      }
      if (!href.startsWith("#") || href === "#" || seen.has(href)) return;
      if (!title || title.length > 40) return;
      seen.add(href);
      out.push({ href, title, desc: "このページ内" });
    });
    return out.slice(0, 14);
  }

  function ensureAssets() {
    if (!document.querySelector('link[data-docs-nav-css]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = hub("assets/docs-nav.css");
      link.setAttribute("data-docs-nav-css", "1");
      document.head.appendChild(link);
    }
  }

  function mount() {
    if (document.getElementById("docsNavFab")) return;
    ensureAssets();
    const sections = pageSections();
    const wrap = document.createElement("div");
    wrap.className = "docs-nav-fab";
    wrap.id = "docsNavFab";
    wrap.innerHTML = `
      <div class="docs-nav-fab__panel" id="docsNavPanel" hidden>
        <div class="docs-nav-fab__head">
          <strong>資料目次</strong>
          <button type="button" class="docs-nav-fab__close" id="docsNavClose" aria-label="閉じる">×</button>
        </div>
        ${sections.length ? `<p class="docs-nav-fab__label">このページ</p><ul class="docs-nav-fab__list">${sections.map((l) => `<li><a href="${l.href}">${l.title}<span>${l.desc}</span></a></li>`).join("")}</ul>` : ""}
        <p class="docs-nav-fab__label">資料全体</p>
        <ul class="docs-nav-fab__list">
          ${GLOBAL_LINKS.map((l) => `<li><a href="${l.href}">${l.title}<span>${l.desc}</span></a></li>`).join("")}
        </ul>
        <p class="docs-nav-fab__note">各ページのヘッダーとは別に、右下から共通の目次へ移動できます。</p>
      </div>
      <button type="button" class="docs-nav-fab__btn" id="docsNavToggle" aria-expanded="false" aria-controls="docsNavPanel">目次</button>
    `;
    document.body.appendChild(wrap);
    const panel = document.getElementById("docsNavPanel");
    const toggle = document.getElementById("docsNavToggle");
    const close = document.getElementById("docsNavClose");
    const setOpen = (open) => {
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "閉じる" : "目次";
    };
    toggle.addEventListener("click", () => setOpen(panel.hidden));
    close.addEventListener("click", () => setOpen(false));
    panel.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
  window.DocsNav = { remount: mount };
})();
