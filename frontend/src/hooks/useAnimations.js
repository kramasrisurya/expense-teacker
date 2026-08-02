import { useEffect, useState } from 'react';

// Reveal-on-scroll: call once per page after its content has rendered.
// Observes every `.reveal` element; siblings within the same parent get
// a 120ms stagger. Pass deps (e.g. [loading]) so late-rendered content
// is picked up.
export function useReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.active)'));
    if (els.length === 0) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = Array.from(el.parentElement?.children ?? [])
            .filter((c) => c.classList.contains('reveal') && !c.classList.contains('active'));
          const i = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = `${i * 120}ms`;
          el.classList.add('active');
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Parallax: writes --scroll-y on <html>; .parallax-up/.parallax-down
// consume it in CSS. Zeroed under 768px (CSS also disables it there).
export function useParallax() {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    let raf = 0;
    const write = () => {
      raf = 0;
      document.documentElement.style.setProperty(
        '--scroll-y',
        mq.matches ? String(window.scrollY) : '0'
      );
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(write); };
    write();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

// Navbar scroll state: true once the page is scrolled past `threshold`.
export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold);
  useEffect(() => {
    let raf = 0;
    const check = () => { raf = 0; setScrolled(window.scrollY > threshold); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [threshold]);
  return scrolled;
}
