/**
 * Fades in `[data-reveal]` elements as they enter the viewport. Adds the
 * `reveal-enabled` class only once JS + motion are both confirmed, so the
 * prerendered markup (and reduced-motion visitors) stay fully visible with no JS.
 */
export function initScrollReveal(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) {
    return;
  }
  document.documentElement.classList.add('reveal-enabled');

  // One macrotask later: hydration can still be claiming nodes in this tick, and
  // resets a node's classList when it claims it, wiping an is-visible added too early.
  setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    targets.forEach((target) => observer.observe(target));
  }, 0);
}
