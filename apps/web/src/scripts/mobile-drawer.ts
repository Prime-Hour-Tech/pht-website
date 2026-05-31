// Mobile drawer: toggles a full-screen slide-down nav panel.
//
// Reads:
//   [data-mobile-toggle]   button - toggles drawer open/closed
//   [data-mobile-drawer]   panel - full-screen, slides via translate-y
//   [data-mobile-close]    optional close button inside drawer
//
// Behavior:
//   Click toggle → open. ESC → close. Click outside the drawer (impossible
//   since it's full-screen) is replaced by clicking the explicit close
//   button or a nav link inside the drawer.
//   While open: body overflow locked; focus trapped between first + last
//   tabbable element inside drawer.

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

function setupMobileDrawer() {
  const toggle = document.querySelector<HTMLElement>("[data-mobile-toggle]");
  const drawer = document.querySelector<HTMLElement>("[data-mobile-drawer]");
  if (!toggle || !drawer) return;

  // Backgrounds the rest of the page when drawer is open; screen readers
  // should not see nav/main/footer content while the modal is up.
  const backgroundEls = Array.from(
    document.querySelectorAll<HTMLElement>("nav[aria-label='Main navigation'], main, footer"),
  );
  function setBackgroundInert(inert: boolean) {
    backgroundEls.forEach((el) => {
      if (inert) {
        el.setAttribute("inert", "");
        el.setAttribute("aria-hidden", "true");
      } else {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      }
    });
  }

  let lastFocused: HTMLElement | null = null;

  function open() {
    if (!drawer || !toggle) return;
    lastFocused = document.activeElement as HTMLElement | null;
    drawer.classList.remove("-translate-y-full", "pointer-events-none");
    drawer.classList.add("translate-y-0");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    setBackgroundInert(true);
    const first = getFocusableElements(drawer)[0];
    first?.focus();
  }

  function close() {
    if (!drawer || !toggle) return;
    drawer.classList.add("-translate-y-full", "pointer-events-none");
    drawer.classList.remove("translate-y-0");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setBackgroundInert(false);
    lastFocused?.focus();
  }

  function isOpen() {
    return drawer?.getAttribute("aria-hidden") === "false";
  }

  toggle.addEventListener("click", () => {
    if (isOpen()) close();
    else open();
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      const focusables = getFocusableElements(drawer!);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  drawer
    .querySelectorAll<HTMLElement>("[data-mobile-close], a[href]")
    .forEach((el) => el.addEventListener("click", () => close()));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupMobileDrawer);
} else {
  setupMobileDrawer();
}
