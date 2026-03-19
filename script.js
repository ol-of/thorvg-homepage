const THEME_STORAGE_KEY = "thorvg-theme";

function isFileProtocol() {
  return window.location.protocol === "file:";
}

function localRoute(path) {
  return isFileProtocol() ? `${path}index.html` : path;
}

function getPreferredTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

applyTheme(getPreferredTheme());

function normalizePath() {
  const baseElement = document.querySelector("base");
  const baseHref = baseElement?.href || "/";
  const rawPath = window.location.pathname;
  const basePathname = (() => {
    try {
      return new URL(baseHref, window.location.href).pathname;
    } catch {
      return "/";
    }
  })();

  if (basePathname !== "/" && rawPath.startsWith(basePathname)) {
    const trimmed = rawPath.slice(basePathname.length).replace(/^\/+/, "");
    return "/" + trimmed;
  }
  return rawPath || "/";
}

function getRouteState() {
  const path = normalizePath().replace(/index\.html$/, "");

  if (path === "/" || path === "") return { current: "home" };
  if (path.startsWith("/about")) return { current: "about" };
  if (path.startsWith("/showcase")) return { current: "showcase" };
  if (path.startsWith("/blog")) return { current: "blog" };
  if (path.startsWith("/docs") || path.startsWith("/tutorial") || path.startsWith("/api")) return { current: "docs" };
  if (path.startsWith("/tools") || path.startsWith("/viewer")) return { current: "tools" };
  return { current: "home" };
}

const primaryNav = [
  { key: "about", label: "About", href: localRoute("about/") },
  { key: "showcase", label: "Showcase", href: localRoute("showcase/") },
  { key: "docs", label: "Docs", href: localRoute("docs/") },
  { key: "blog", label: "Blog", href: localRoute("blog/") },
  { key: "tools", label: "Tools", href: localRoute("tools/") }
];

const utilityNav = [
  { key: "release", label: "Release", href: "https://github.com/thorvg/thorvg/releases", external: true },
  { key: "signin", label: "GitHub", href: "https://github.com/thorvg/thorvg", external: true },
  { key: "wiki", label: "Deep Wiki", href: "https://deepwiki.com/thorvg/thorvg", external: true }
];

function externalIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 17L17 7"></path>
      <path d="M9 7h8v8"></path>
    </svg>
  `;
}

function themeIcon(theme) {
  if (theme === "dark") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.55 1.55M17.52 17.52l1.55 1.55M2 12h2.2M19.8 12H22M4.93 19.07l1.55-1.55M17.52 6.48l1.55-1.55"></path>
    </svg>
  `;
}

function buildLink(link, current, className) {
  const activeClass = link.key === current ? " is-current" : "";
  const externalAttrs = link.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  const icon = className === "site-drawer-link" && link.external ? externalIcon() : "";
  return `<a class="${className}${activeClass}" href="${link.href}"${externalAttrs}>${link.label}${icon}</a>`;
}

function buildHeader(current) {
  const theme = document.documentElement.dataset.theme || "light";
  return `
    <div class="site-header-inner">
      <a class="site-brand" href="${localRoute("")}" aria-label="ThorVG Home">
        <img class="site-brand-logo site-brand-logo-light" src="logo/thorvg/ThorVG_Mono_Black.svg" alt="ThorVG" />
        <img class="site-brand-logo site-brand-logo-dark" src="logo/thorvg/ThorVG_Full_Color.svg" alt="ThorVG" />
      </a>
      <nav class="site-nav" aria-label="Primary">
        ${primaryNav.map((link) => buildLink(link, current, "site-nav-link")).join("")}
      </nav>
      <div class="site-header-links">
        ${utilityNav.map((link) => buildLink(link, current, "site-header-link")).join("")}
      </div>
      <button class="theme-toggle" type="button" aria-label="Toggle color theme" aria-pressed="${theme === "dark"}">
        ${themeIcon(theme)}
      </button>
      <button class="drawer-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-drawer">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <path d="M4 7h16M4 12h16M4 17h16"></path>
        </svg>
      </button>
    </div>
  `;
}

function buildDrawer(current) {
  const combinedLinks = [...primaryNav, ...utilityNav];
  return `
    <div class="site-drawer-inner">
      ${combinedLinks.map((link) => buildLink(link, current, "site-drawer-link")).join("")}
    </div>
  `;
}

function buildFooter() {
  return `
    <div class="site-footer-inner">
      <div class="site-footer-top">
        <a class="site-brand" href="${localRoute("")}" aria-label="ThorVG Home">
          <img class="site-brand-logo site-brand-logo-light" src="logo/thorvg/ThorVG_Mono_Black.svg" alt="ThorVG" />
          <img class="site-brand-logo site-brand-logo-dark" src="logo/thorvg/ThorVG_Full_Color.svg" alt="ThorVG" />
        </a>
        <div class="site-footer-links">
          <a href="${localRoute("about/")}">About</a>
          <a href="${localRoute("showcase/")}">Showcase</a>
          <a href="${localRoute("docs/")}">Docs</a>
          <a href="${localRoute("tools/")}">Tools</a>
          <a href="${localRoute("blog/")}">Blog</a>
        </div>
      </div>
      <div class="site-footer-bottom">
        <span>© 2020–2026 The ThorVG Project.</span>
        <div class="site-footer-socials">
          <a href="https://github.com/thorvg/thorvg" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/company/thorvg/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://deepwiki.com/thorvg/thorvg" target="_blank" rel="noopener noreferrer">Deep Wiki</a>
          <a href="mailto:thorvg@thorvg.org?subject=Hello%2C%20ThorVG!">Contact</a>
        </div>
      </div>
    </div>
  `;
}

function mountSiteChrome() {
  const { current } = getRouteState();
  const header = document.querySelector("header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = buildHeader(current);
  }

  let drawer = document.querySelector(".menu-drawer");
  if (!drawer) {
    drawer = document.createElement("nav");
    if (header) header.insertAdjacentElement("afterend", drawer);
  }
  drawer.className = "site-drawer";
  drawer.id = "site-drawer";
  drawer.innerHTML = buildDrawer(current);

  const footer = document.querySelector("footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = buildFooter();
  }

  const body = document.body;
  if (body) body.classList.add("legacy-shell");

  const themeButton = document.querySelector(".theme-toggle");
  const drawerButton = document.querySelector(".drawer-toggle");

  themeButton?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    themeButton.innerHTML = themeIcon(nextTheme);
    themeButton.setAttribute("aria-pressed", String(nextTheme === "dark"));
  });

  drawerButton?.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("is-open");
    drawerButton.setAttribute("aria-expanded", String(isOpen));
  });

  drawer?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("is-open");
      drawerButton?.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1080) {
      drawer.classList.remove("is-open");
      drawerButton?.setAttribute("aria-expanded", "false");
    }
  });
}

function setupCodeCopy() {
  const snippets = document.querySelectorAll(".code-block");
  snippets.forEach((snippet) => {
    const button = snippet.querySelector(".copy-button");
    const code = snippet.querySelector(".code-content");
    const copyIcon = snippet.querySelector(".copy-icon");
    const doneIcon = snippet.querySelector(".done-icon");

    if (!button || !code || !copyIcon || !doneIcon) return;

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(code.textContent.trim()).then(() => {
        copyIcon.classList.remove("active");
        doneIcon.classList.add("active");

        setTimeout(() => {
          doneIcon.classList.remove("active");
          copyIcon.classList.add("active");
        }, 700);
      });
    });
  });
}

function setupToTopButton() {
  const toTopBtn = document.getElementById("to-top-btn");
  if (!toTopBtn) return;

  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function checkOverlapWithFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const footerRect = footer.getBoundingClientRect();
    const btnRect = toTopBtn.getBoundingClientRect();
    const isOverlapping = btnRect.bottom > footerRect.top && btnRect.top < footerRect.bottom;

    toTopBtn.style.backgroundColor = isOverlapping ? "#ffffff" : "";
    toTopBtn.style.color = isOverlapping ? "#000000" : "";
  }

  function toggleToTopBtn() {
    const hasScrolled = window.scrollY > 200;
    toTopBtn.style.opacity = hasScrolled ? "1" : "0";
    toTopBtn.style.visibility = hasScrolled ? "visible" : "hidden";
    toTopBtn.style.pointerEvents = hasScrolled ? "auto" : "none";
    checkOverlapWithFooter();
  }

  toggleToTopBtn();
  window.addEventListener("scroll", toggleToTopBtn);
  window.addEventListener("resize", toggleToTopBtn);
}

function setupFadeIns() {
  document.querySelector(".fade-in-and-move-up-on-load")?.classList.add("show");
  requestAnimationFrame(() => {
    document.querySelectorAll(".fade-in-on-load").forEach((element) => {
      element.classList.add("show");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountSiteChrome();
  setupCodeCopy();
  setupToTopButton();
  setupFadeIns();
});
