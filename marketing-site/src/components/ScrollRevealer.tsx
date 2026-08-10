'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollRevealer() {
  const pathname = usePathname();

  useEffect(() => {
    function observeUnrevealed() {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
      );

      if (els.length === 0) return;

      if (!('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('is-visible'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '50px 0px 50px 0px' }
      );

      els.forEach((el) => observer.observe(el));
    }

    observeUnrevealed();

    // Observe dynamic DOM changes (e.g. category filter tag switches)
    const mutationObserver = new MutationObserver(() => {
      observeUnrevealed();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => mutationObserver.disconnect();
  }, [pathname]);

  return null;
}
