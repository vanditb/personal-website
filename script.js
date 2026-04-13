import { siteContent as content } from "./data.js";

const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function formatMonthLabel(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
  })
    .format(new Date(dateString))
    .toLowerCase();
}

function formatDayLabel(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric"
  })
    .format(new Date(dateString))
    .toLowerCase();
}

function formatClock() {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/New_York"
  })
    .format(new Date())
    .toLowerCase();

  return `${time} est`;
}

function sortByNewest(items) {
  return [...items].sort(
    (left, right) => new Date(right.date) - new Date(left.date)
  );
}

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("theme-preference", theme);

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "light / dark" : "dark / light";
  }
}

function initializeTheme() {
  const storedTheme = localStorage.getItem("theme-preference");
  const initialTheme = storedTheme || (prefersDark.matches ? "dark" : "light");
  applyTheme(initialTheme);
}

function initializeFadeIn() {
  const elements = document.querySelectorAll(".fade-in");
  if (!elements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((element) => observer.observe(element));
}

function initializePageTransitions() {
  if (prefersReducedMotion.matches) {
    return;
  }

  body.classList.add("is-page-entering");

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      body.classList.remove("is-page-entering");
    });
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link) {
      return;
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      link.target === "_blank" ||
      link.hasAttribute("download")
    ) {
      return;
    }

    const nextUrl = new URL(link.href, window.location.href);

    if (nextUrl.origin !== window.location.origin) {
      return;
    }

    if (
      nextUrl.pathname === window.location.pathname &&
      nextUrl.search === window.location.search &&
      nextUrl.hash
    ) {
      return;
    }

    event.preventDefault();
    body.classList.add("is-leaving");

    window.setTimeout(() => {
      window.location.href = nextUrl.href;
    }, 180);
  });
}

function initializeFooter() {
  const socialStrip = document.getElementById("social-strip");
  const footerEmail = document.getElementById("footer-email");
  const liveTime = document.getElementById("live-time");

  if (socialStrip) {
    socialStrip.innerHTML = content.contact.socials
      .map(
        (social) => `
          <a href="${social.url}" target="_blank" rel="noreferrer">${social.label}</a>
        `
      )
      .join("");
  }

  if (footerEmail) {
    footerEmail.href = `mailto:${content.contact.email}`;
    footerEmail.textContent = `reach out, ${content.contact.email}`;
  }

  if (liveTime) {
    liveTime.textContent = formatClock();
    window.setInterval(() => {
      liveTime.textContent = formatClock();
    }, 1000);
  }
}

function renderHome() {
  const currentBlock = document.getElementById("currently-working");
  const recentActivity = document.getElementById("recent-activity");

  if (!currentBlock || !recentActivity) {
    return;
  }

  currentBlock.innerHTML = `
    <p class="page-label">${content.profile.currentlyWorking.label}</p>
    <p class="type-line type-line-primary">${content.profile.currentlyWorking.title}</p>
    <p class="inline-detail type-line type-line-secondary">${content.profile.currentlyWorking.detail}</p>
  `;

  recentActivity.innerHTML = sortByNewest(content.buildLog)
    .slice(0, 3)
    .map(
      (item, index) => `
        <article class="ledger-line fade-in" style="--delay: ${index * 80}ms">
          <span class="ledger-date">${formatDayLabel(item.date)}</span>
          <span class="ledger-text">${item.entry}</span>
          <span class="ledger-tag">— ${item.tag}</span>
        </article>
      `
    )
    .join("");
}

function renderProjects() {
  const projectList = document.getElementById("project-list");
  if (!projectList) {
    return;
  }

  projectList.innerHTML = content.projects
    .map(
      (project, index) => `
        <details class="project-item fade-in" style="--delay: ${index * 70}ms">
          <summary class="project-summary">
            <span class="project-toggle" aria-hidden="true">></span>
            <div class="project-copy">
              <h2>${project.name}</h2>
              <p>${project.blurb}</p>
            </div>
            <p class="project-meta">${project.year} / ${project.status}</p>
          </summary>
          <div class="project-detail">
            <p>${project.description}</p>
            <p>${project.why}</p>
            <div class="project-links">
              <a href="${project.github}" target="_blank" rel="noreferrer">→ github</a>
              ${
                project.demo
                  ? `<a href="${project.demo}" target="_blank" rel="noreferrer">→ live</a>`
                  : ""
              }
            </div>
          </div>
        </details>
      `
    )
    .join("");
}

function renderBuildLog() {
  const buildLogLedger = document.getElementById("build-log-ledger");
  if (!buildLogLedger) {
    return;
  }

  const grouped = sortByNewest(content.buildLog).reduce((accumulator, item) => {
    const month = formatMonthLabel(item.date);
    if (!accumulator[month]) {
      accumulator[month] = [];
    }

    accumulator[month].push(item);
    return accumulator;
  }, {});

  buildLogLedger.innerHTML = Object.entries(grouped)
    .map(
      ([month, entries]) => `
        <section class="month-group fade-in">
          <p class="month-label">${month}</p>
          <div class="month-entries">
            ${entries
              .map(
                (item, index) => `
                  <article class="ledger-line fade-in" style="--delay: ${index * 80}ms">
                    <span class="ledger-date">${formatDayLabel(item.date)}</span>
                    <span class="ledger-text">${item.entry}</span>
                    <span class="ledger-tag">— ${item.tag}</span>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

initializeTheme();
initializeFooter();
initializePageTransitions();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

if (body.dataset.page === "home") {
  renderHome();
}

if (body.dataset.page === "projects") {
  renderProjects();
}

if (body.dataset.page === "build-log") {
  renderBuildLog();
}

initializeFadeIn();
