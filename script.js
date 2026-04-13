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
