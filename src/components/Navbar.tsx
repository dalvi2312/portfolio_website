'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import BrandLogo from './BrandLogo';

function RolodexText({ text }: { text: string }) {
  return (
    <span className="relative inline-flex flex-col h-[1.15em] overflow-hidden leading-[1.15em]">
      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-full left-0 inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
      >
        {text}
      </span>
    </span>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);

  const leftLogoRef = useRef<HTMLDivElement>(null);
  const centerNavRef = useRef<HTMLElement>(null);
  const rightCtaRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isHidden = false;
    let ticking = false;

    // Detect if the navbar is currently over a dark background section
    const checkBackgroundTheme = () => {
      const testY = 55; // vertical height of the logo in the viewport
      const darkSections = document.querySelectorAll<HTMLElement>(
        '[data-theme="dark"], #services, #timeline, #life, footer'
      );

      for (let i = 0; i < darkSections.length; i++) {
        const rect = darkSections[i].getBoundingClientRect();
        if (rect.top <= testY && rect.bottom > testY) {
          return true;
        }
      }
      return false;
    };

    // Initial check on mount
    const initialDark = checkBackgroundTheme();
    setIsDarkBg(initialDark);

    const killAllTweens = () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      if (centerNavRef.current) gsap.killTweensOf(centerNavRef.current);
      if (leftLogoRef.current) gsap.killTweensOf(leftLogoRef.current);
      if (rightCtaRef.current) gsap.killTweensOf(rightCtaRef.current);
    };

    const hideNavbar = () => {
      setMobileMenuOpen(false);
      killAllTweens();

      if (centerNavRef.current) centerNavRef.current.style.pointerEvents = 'none';
      if (leftLogoRef.current) leftLogoRef.current.style.pointerEvents = 'none';
      if (rightCtaRef.current) rightCtaRef.current.style.pointerEvents = 'none';

      const tl = gsap.timeline();
      tlRef.current = tl;

      // Stage 1 (Immediate / 0ms): Center anchor tags move UP and disappear first
      if (centerNavRef.current) {
        tl.to(
          centerNavRef.current,
          {
            y: -55,
            opacity: 0,
            duration: 0.28,
            ease: 'power2.in',
          },
          0
        );
      }

      // Stage 2 (Staggered: next millisecond / ~100ms): Logo moves LEFT, CTA moves RIGHT and disappear
      if (leftLogoRef.current) {
        tl.to(
          leftLogoRef.current,
          {
            x: -75,
            opacity: 0,
            duration: 0.28,
            ease: 'power2.in',
          },
          0.1
        );
      }

      if (rightCtaRef.current) {
        tl.to(
          rightCtaRef.current,
          {
            x: 75,
            opacity: 0,
            duration: 0.28,
            ease: 'power2.in',
          },
          0.1
        );
      }
    };

    const showNavbar = () => {
      killAllTweens();

      if (centerNavRef.current) centerNavRef.current.style.pointerEvents = 'auto';
      if (leftLogoRef.current) leftLogoRef.current.style.pointerEvents = 'auto';
      if (rightCtaRef.current) rightCtaRef.current.style.pointerEvents = 'auto';

      const tl = gsap.timeline();
      tlRef.current = tl;

      // Stage 1 (Immediate / 0ms): Outer components (Logo from left, CTA from right) return first
      if (leftLogoRef.current) {
        tl.to(
          leftLogoRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power3.out',
          },
          0
        );
      }

      if (rightCtaRef.current) {
        tl.to(
          rightCtaRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power3.out',
          },
          0
        );
      }

      // Stage 2 (Staggered: next millisecond / ~100ms): Center anchor tags slide down into view
      if (centerNavRef.current) {
        tl.to(
          centerNavRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power3.out',
          },
          0.1
        );
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        // Dynamically update the logo theme based on the section currently under the navbar
        const currentlyDark = checkBackgroundTheme();
        setIsDarkBg((prev) => (prev !== currentlyDark ? currentlyDark : prev));

        // Always show and stay visible at the top of the page
        if (currentScrollY <= 30) {
          if (isHidden) {
            showNavbar();
            isHidden = false;
          }
          lastScrollY = currentScrollY;
          ticking = false;
          return;
        }

        // Avoid jitter on microscopic scroll movements
        if (Math.abs(delta) < 3) {
          ticking = false;
          return;
        }

        if (delta > 0) {
          // Scrolling DOWN -> Choreographed exit
          if (!isHidden) {
            hideNavbar();
            isHidden = true;
          }
        } else {
          // Scrolling UP -> Choreographed entrance (exact opposite)
          if (isHidden) {
            showNavbar();
            isHidden = false;
          }
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      killAllTweens();
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none px-6 sm:px-8 md:px-10 lg:px-12 py-5 sm:py-6 md:py-8 flex items-center justify-between">
        {/* Left End: Brand / Nav Logo */}
        <div
          ref={leftLogoRef}
          className="pointer-events-auto flex items-center justify-start will-change-transform"
        >
          <Link
            href="#"
            className="group flex items-center justify-center hover:opacity-80 transition-opacity"
            title="Durgesh Dalvi — Home"
          >
            <BrandLogo
              isDarkBackground={isDarkBg || mobileMenuOpen}
              className="h-10 sm:h-11 md:h-12 w-auto transition-transform duration-200 group-hover:scale-105 drop-shadow-sm"
            />
          </Link>
        </div>

        {/* Center: Desktop Nav Links (Grigoletti Swiss Brutalist Button Islands) */}
        <nav
          ref={centerNavRef}
          className="pointer-events-auto hidden md:flex items-center gap-2 will-change-transform"
        >
          <Link
            href="#skills"
            className="group relative h-11 px-4 flex items-center justify-center bg-[#EBE9E4] hover:bg-[#111111] text-[#111111] hover:text-[#EBE9E4] border border-[#111111] rounded-[4px] font-display tracking-[0.05em] text-[17px] leading-none uppercase transition-colors duration-200 shadow-sm"
          >
            <RolodexText text="Skills" />
          </Link>
          <Link
            href="#timeline"
            className="group relative h-11 px-4 flex items-center justify-center bg-[#EBE9E4] hover:bg-[#111111] text-[#111111] hover:text-[#EBE9E4] border border-[#111111] rounded-[4px] font-display tracking-[0.05em] text-[17px] leading-none uppercase transition-colors duration-200 shadow-sm"
          >
            <RolodexText text="Timeline" />
          </Link>
          <Link
            href="#projects"
            className="group relative h-11 px-4 flex items-center justify-center bg-[#EBE9E4] hover:bg-[#111111] text-[#111111] hover:text-[#EBE9E4] border border-[#111111] rounded-[4px] font-display tracking-[0.05em] text-[17px] leading-none uppercase transition-colors duration-200 shadow-sm"
          >
            <RolodexText text="Projects" />
          </Link>
          <Link
            href="#life"
            className="group relative h-11 px-4 flex items-center justify-center bg-[#EBE9E4] hover:bg-[#111111] text-[#111111] hover:text-[#EBE9E4] border border-[#111111] rounded-[4px] font-display tracking-[0.05em] text-[17px] leading-none uppercase transition-colors duration-200 shadow-sm"
          >
            <RolodexText text="Life" />
          </Link>
        </nav>

        {/* Right End: Nav CTA + Mobile Menu Button */}
        <div
          ref={rightCtaRef}
          className="pointer-events-auto flex items-center gap-2 will-change-transform"
        >
          {/* Grigoletti Signature Contact Button — Inverts between dark & light modes */}
          <Link
            href="#contact"
            className={`group relative h-11 pl-2 pr-4 flex items-center gap-3 border rounded-[4px] font-display tracking-[0.05em] text-[17px] leading-none uppercase transition-all duration-300 shadow-sm active:scale-95 ${
              isDarkBg
                ? 'bg-[#ECE8DF] text-[#111111] border-[#ECE8DF] hover:bg-[#FF4C24] hover:text-white hover:border-[#FF4C24] shadow-[0_2px_10px_rgba(0,0,0,0.35)]'
                : 'bg-[#111111] text-[#EBE9E4] border-[#111111] hover:bg-[#FF4C24] hover:text-[#111111] hover:border-[#FF4C24]'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-[2px] overflow-hidden shrink-0 border transition-colors duration-300 ${
                isDarkBg ? 'border-neutral-400 bg-neutral-300' : 'border-neutral-700 bg-neutral-800'
              }`}
            >
              <img
                alt="Durgesh Dalvi"
                className="w-full h-full object-cover object-top"
                width={28}
                height={28}
                src="/images/avatar-contact.webp"
              />
            </div>
            <RolodexText text="Contact" />
          </Link>

          {/* Mobile Menu Trigger (Visible on small screens) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden group relative h-11 px-3.5 flex items-center justify-center border rounded-[4px] font-display tracking-[0.05em] text-[16px] leading-none uppercase transition-colors duration-300 shadow-sm ${
              isDarkBg
                ? 'bg-[#ECE8DF] text-[#111111] border-[#ECE8DF] hover:bg-[#FF4C24] hover:text-white'
                : 'bg-[#EBE9E4] text-[#111111] border-[#111111] hover:bg-[#111111] hover:text-[#EBE9E4]'
            }`}
            aria-label="Toggle navigation menu"
          >
            <RolodexText text={mobileMenuOpen ? "Close" : "Menu"} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-20 right-6 sm:right-8 z-50 md:hidden bg-[#EBE9E4] border border-[#111111] rounded-[4px] p-2 flex flex-col gap-1 shadow-2xl min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-150 pointer-events-auto">
          <Link
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 text-center font-display text-[17px] uppercase tracking-[0.05em] text-[#111111] hover:bg-[#111111] hover:text-[#EBE9E4] rounded-[2px] transition-colors"
          >
            Skills
          </Link>
          <Link
            href="#timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 text-center font-display text-[17px] uppercase tracking-[0.05em] text-[#111111] hover:bg-[#111111] hover:text-[#EBE9E4] rounded-[2px] transition-colors"
          >
            Timeline
          </Link>
          <Link
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 text-center font-display text-[17px] uppercase tracking-[0.05em] text-[#111111] hover:bg-[#111111] hover:text-[#EBE9E4] rounded-[2px] transition-colors"
          >
            Projects
          </Link>
          <Link
            href="#life"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 text-center font-display text-[17px] uppercase tracking-[0.05em] text-[#111111] hover:bg-[#111111] hover:text-[#EBE9E4] rounded-[2px] transition-colors"
          >
            Life
          </Link>
        </div>
      )}
    </>
  );
}
