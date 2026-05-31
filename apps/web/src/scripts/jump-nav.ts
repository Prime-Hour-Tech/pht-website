// Scroll-spy for the industries "Jump to" nav: highlights the chip whose section
// is currently below the sticky header bars (red border + text) and keeps that
// chip scrolled into view within its horizontal strip.
//
// Pattern: IntersectionObserver-based scroll-spy (preferred over a scroll
// listener for the codebase). The browser computes section geometry as part of
// its normal rendering pipeline and only invokes the callback when a section
// crosses the trigger band — no scroll handler, no per-frame getBoundingClientRect.
// Copy this shape for any future "which section is in view" highlighting.

const linkEls = Array.from(
  document.querySelectorAll<HTMLAnchorElement>("[data-jump-link]"),
);

if (linkEls.length > 0) {
  type Entry = { id: string; link: HTMLAnchorElement; section: HTMLElement };

  // Pair each jump-link with the section it targets (via its href="#id").
  const entries: Entry[] = [];
  for (const link of linkEls) {
    const id = link.getAttribute("href")?.slice(1) ?? "";
    const section = id ? document.getElementById(id) : null;
    if (section) entries.push({ id, link, section });
  }

  const jumpNav = document.querySelector<HTMLElement>("[data-jump-nav]");
  const strip = document.querySelector<HTMLElement>("[data-jump-scroll]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Combined height of the two stacked sticky bars (SiteNav + this jump-nav). The
  // observer root is inset from the top by this much, so a section only counts as
  // "current" once it reaches the area just below them.
  function stickyOffset(): number {
    const navH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-height"),
        10,
      ) || 73;
    return navH + (jumpNav?.offsetHeight ?? 84);
  }

  // Keep the active chip visible inside the horizontal strip. Scrolls only the
  // strip (never the page), and only when the chip isn't already fully visible.
  function revealChip(link: HTMLElement): void {
    if (!strip) return;
    const sRect = strip.getBoundingClientRect();
    const lRect = link.getBoundingClientRect();
    if (lRect.left >= sRect.left && lRect.right <= sRect.right) return; // already in view
    const centered = strip.scrollLeft + (lRect.left - sRect.left) - (strip.clientWidth - lRect.width) / 2;
    const left = Math.max(0, Math.min(centered, strip.scrollWidth - strip.clientWidth));
    strip.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }

  // Toggle the active styling. Guarded so the DOM is only touched when the active
  // section actually changes.
  let activeId: string | null = null;
  function setActive(id: string | null): void {
    if (id === activeId) return;
    activeId = id;
    for (const entry of entries) {
      const on = entry.id === id;
      entry.link.classList.toggle("border-accent", on);
      entry.link.classList.toggle("text-accent", on);
      entry.link.classList.toggle("border-line", !on);
      entry.link.classList.toggle("text-ink", !on);
      if (on) {
        entry.link.setAttribute("aria-current", "true");
        revealChip(entry.link);
      } else {
        entry.link.removeAttribute("aria-current");
      }
    }
  }

  // Active = the topmost (document order) section currently in the trigger band.
  const inBand = new Set<string>();
  function recompute(): void {
    let current: string | null = null;
    for (const { id } of entries) {
      if (inBand.has(id)) {
        current = id;
        break;
      }
    }
    setActive(current);
  }

  // rootMargin's top inset is a fixed px value baked in at construction, so the
  // observer is rebuilt whenever the sticky height can change (resize / rotate).
  let observer: IntersectionObserver | null = null;
  function build(): void {
    observer?.disconnect();
    inBand.clear();
    observer = new IntersectionObserver(
      (records: IntersectionObserverEntry[]) => {
        for (const r of records) {
          if (r.isIntersecting) inBand.add(r.target.id);
          else inBand.delete(r.target.id);
        }
        recompute();
      },
      { rootMargin: `-${stickyOffset()}px 0px -55% 0px`, threshold: 0 },
    );
    for (const { section } of entries) observer.observe(section);
  }

  build();

  // Debounce the rebuild: a drag-resize fires `resize` dozens of times per
  // second, and each build() disconnects/reconstructs the observer and forces
  // layout (getComputedStyle + offsetHeight). Coalesce to one rebuild after
  // the resize settles.
  let resizeTimer: number | undefined;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(build, 150);
  });
}
