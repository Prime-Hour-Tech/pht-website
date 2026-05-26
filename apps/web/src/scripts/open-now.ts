// Open-now indicator — toggles the dot + label between "Open now · …"
// (success color) and "Closed · …" (muted color) based on the current
// minute-of-day in the configured IANA timezone.
//
// Reads from a single [data-open-now] element in the rendered HTML:
//   data-open-minute   number   0–1439, minute-of-day open
//   data-close-minute  number   0–1439, minute-of-day close
//   data-timezone      string   IANA tz (e.g. America/Denver)
//
// Updates:
//   [data-open-now-dot]   class — bg-success when open, bg-muted when closed
//   [data-open-now-label] text — leading "Open now" / "Closed" + the
//                                existing weekday-label trailing string

function currentMinuteInTimezone(tz: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return hour * 60 + minute;
}

function applyOpenState() {
  const root = document.querySelector<HTMLElement>("[data-open-now]");
  if (!root) return;
  const openMinute = Number(root.dataset.openMinute);
  const closeMinute = Number(root.dataset.closeMinute);
  const tz = root.dataset.timezone || "America/Denver";
  const label = root.querySelector<HTMLElement>("[data-open-now-label]");
  const dot = root.querySelector<HTMLElement>("[data-open-now-dot]");
  if (!label || !dot || Number.isNaN(openMinute) || Number.isNaN(closeMinute)) return;

  const now = currentMinuteInTimezone(tz);
  const isOpen = now >= openMinute && now < closeMinute;
  const weekdayLabel = root.dataset.weekdayLabel ?? "";

  if (isOpen) {
    label.textContent = `Open now · ${weekdayLabel}`;
    root.classList.remove("text-muted");
    root.classList.add("text-success");
    dot.classList.remove("bg-muted");
    dot.classList.add("bg-success", "animate-pulse");
  } else {
    label.textContent = `Closed · ${weekdayLabel}`;
    root.classList.remove("text-success");
    root.classList.add("text-muted");
    dot.classList.remove("bg-success", "animate-pulse");
    dot.classList.add("bg-muted");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyOpenState);
} else {
  applyOpenState();
}
