'use client';

import {
  useEffect,
  useRef,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: Parameters<Lenis['scrollTo']>[1]
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: ReactNode;
  isLoading?: boolean;
}

export default function SmoothScroll({
  children,
  isLoading = false,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: Parameters<Lenis['scrollTo']>[1]
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    },
    []
  );

  useEffect(() => {
    // 1. Initialize Lenis instance
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
      autoResize: true,
      respectReducedMotion: false,
      prevent: (node) => node.hasAttribute('data-lenis-prevent'),
    });

    lenisRef.current = lenis;

    // Expose lenis instance globally on window for debugging & components
    if (typeof window !== 'undefined') {
      (window as unknown as { lenis: Lenis }).lenis = lenis;
    }

    // 2. Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect Lenis raf loop to GSAP's ticker for perfectly synced animation frame rates
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 4. Global click interceptor for all anchor links (#skills, #projects, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Handle internal anchors (#, #skills, #timeline, /#skills on home, etc.)
      if (
        href === '#' ||
        href.startsWith('#') ||
        (href.startsWith('/#') && window.location.pathname === '/')
      ) {
        // Skip external or new-tab links
        if (anchor.target === '_blank') return;

        const hash = href.startsWith('/#') ? href.slice(1) : href;

        e.preventDefault();

        if (hash === '#' || hash === '') {
          // Scroll to very top of page
          lenis.scrollTo(0, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          if (window.history.pushState) {
            window.history.pushState(null, '', window.location.pathname);
          }
          return;
        }

        const targetEl = document.querySelector(hash);
        if (targetEl) {
          // -80px offset provides perfect clearance below the fixed header
          lenis.scrollTo(targetEl as HTMLElement, {
            offset: -80,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          if (window.history.pushState) {
            window.history.pushState(null, '', hash);
          }
        }
      }
    };

    // Use capture phase so we intercept before Next.js default hash jump
    document.addEventListener('click', handleAnchorClick, { capture: true });

    // 5. Window resize and orientation change handlers
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      document.removeEventListener('click', handleAnchorClick, {
        capture: true,
      });
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined') {
        delete (window as unknown as { lenis?: Lenis }).lenis;
      }
    };
  }, []);

  // 6. Handle loading state synchronization
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();

      // Recalculate dimensions and ScrollTriggers after the loading overlay unmounts
      const timer = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();

        // If page was loaded with a hash (#projects, #skills, etc.), smoothly scroll there
        if (typeof window !== 'undefined' && window.location.hash) {
          const targetEl = document.querySelector(window.location.hash);
          if (targetEl) {
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: -80,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
