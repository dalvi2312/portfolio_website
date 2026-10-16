'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const interactiveGroupRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);
  const xSet = useRef<any>(null);
  const ySet = useRef<any>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate badges and elements on initial load
      gsap.from('.hero-badge-in', {
        y: -25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.hero-name-box', {
        scale: 0.7,
        opacity: 0,
        duration: 0.9,
        ease: 'elastic.out(1, 0.65)',
        delay: 0.4,
      });

      gsap.from('.hero-statement-in', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.7,
      });

      gsap.from('.hero-avatar', {
        scale: 0.6,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.5,
      });
    }, sectionRef);

    // Initialize instant zero-delay cursor-following inverted lens
    if (lensRef.current) {
      gsap.set(lensRef.current, {
        scale: 0.35,
        opacity: 0,
      });

      xSet.current = gsap.quickSetter(lensRef.current, 'x', 'px');
      ySet.current = gsap.quickSetter(lensRef.current, 'y', 'px');
    }

    return () => {
      ctx.revert();
      if (lensRef.current) gsap.killTweensOf(lensRef.current);
    };
  }, []);

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    if (!interactiveGroupRef.current || !lensRef.current) return;

    const rect = interactiveGroupRef.current.getBoundingClientRect();
    // Center of 288px lens (144px offset)
    const x = e.clientX - rect.left - 144;
    const y = e.clientY - rect.top - 144;

    // Place at cursor immediately on enter with zero delay
    xSet.current?.(x);
    ySet.current?.(y);

    // Smoothly scale up and fade in
    gsap.to(lensRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    if (!interactiveGroupRef.current) return;

    const rect = interactiveGroupRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 144;
    const y = e.clientY - rect.top - 144;

    // Instant tracking without any lag or delay
    xSet.current?.(x);
    ySet.current?.(y);
  };

  const handlePointerLeave = () => {
    if (!lensRef.current) return;

    gsap.to(lensRef.current, {
      scale: 0.35,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-theme="light"
      className="ca-grid relative flex flex-col justify-center overflow-hidden px-4 min-h-[100svh] pb-14 pt-28 sm:pt-32 sm:pb-20 w-full"
    >
      {/* Subtle paper noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-multiply bg-[radial-gradient(#191510_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {/* Floating Circular Media Badges (Avatars) */}
      <div
        data-pf-block="hero.media"
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      >
        {/* Left Circular Avatar (Outdoors) */}
        <div className="hero-avatar absolute left-3 sm:left-6 md:left-10 lg:left-[6%] xl:left-[11%] top-[27%] sm:top-[28%] md:top-[32%] lg:top-[48%] -translate-y-1/2">
          <div className="float-slow">
            <span className="flex items-center justify-center rounded-full bg-[#ff6a35] p-1 sm:p-1.5 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 xl:h-24 xl:w-24 -rotate-6 shadow-[0_4px_12px_rgba(25,21,16,0.18)] pointer-events-auto hover:scale-110 hover:-rotate-3 transition-transform cursor-pointer">
              <div className="relative overflow-hidden h-full w-full rounded-full">
                <img
                  src="/images/avatar-outdoors.webp"
                  alt="Durgesh Dalvi outdoors"
                  width={96}
                  height={96}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </span>
          </div>
        </div>

        {/* Right Circular Avatar (Portrait) */}
        <div className="hero-avatar absolute right-3 sm:right-6 md:right-10 lg:right-[6%] xl:right-[11%] top-[78%] sm:top-[76%] md:top-[70%] lg:top-[53%] -translate-y-1/2">
          <div className="float-slow-delay">
            <span className="flex items-center justify-center rounded-full bg-[#ff6a35] p-1 sm:p-1.5 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 xl:h-24 xl:w-24 rotate-6 shadow-[0_4px_12px_rgba(25,21,16,0.18)] pointer-events-auto hover:scale-110 hover:rotate-3 transition-transform cursor-pointer">
              <div className="relative overflow-hidden h-full w-full rounded-full">
                <img
                  src="/images/avatar-portrait.webp"
                  alt="Durgesh Dalvi portrait"
                  width={96}
                  height={96}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </span>
          </div>
        </div>
      </div>

      {/* Main Centered Content (max-w-5xl) */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center pt-1 text-center sm:pt-2">
        {/* Interactive Group encompassing the entire central card area */}
        <div
          ref={interactiveGroupRef}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="group/name group-name relative flex w-full flex-col items-center cursor-default"
        >
          {/* Vertical/Mobile Notes (< lg): placed just above "they call me" */}
          <div className="hero-badge-in mb-3 sm:mb-4 flex flex-wrap justify-center gap-2 sm:gap-3 lg:hidden">
            <div className="-rotate-[7.2deg]">
              <span className="ca-mono inline-block rounded-full border-[3px] border-white px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest text-[#191510] shadow-[0_4px_10px_rgba(25,21,16,0.22)] bg-[#c4b5fd]">
                FINE-TUNING THOUGHTS
              </span>
            </div>
            <div className="rotate-[7.2deg]">
              <span className="ca-mono inline-block rounded-full border-[3px] border-white px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest text-[#191510] shadow-[0_4px_10px_rgba(25,21,16,0.22)] bg-[#f3e2ad]">
                EXPLORING LATENT SPACES
              </span>
            </div>
          </div>

          {/* Top Label: "they call me" + Hand-drawn squiggly underline */}
          <div className="hero-badge-in flex flex-col items-center text-[#191510]">
            <p className="ca-hand text-3xl sm:text-4xl text-[#191510]">they call me</p>
            <svg
              viewBox="0 0 64 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="mt-1 h-3 w-20 text-[#191510]"
              aria-hidden="true"
            >
              <path d="M3 4c18-3 40-3 58 0" />
              <path d="M9 9c14-2.5 32-2.5 46 0" />
            </svg>
          </div>

          {/* Central Giant Name in Orange Doodle Box */}
          <div className="hero-name-box relative mt-4 sm:mt-5">
            <div
              className="ca-doodle-box relative inline-block border-[3px] border-[#ff6a35] px-6 py-2 sm:px-12 sm:py-3 bg-[#ECE8DF]/40 shadow-sm"
            >
              <span className="font-pixel text-[18vw] sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] leading-[0.95] tracking-tight text-[#191510] font-bold uppercase inline-block select-none">
                DALVI
              </span>
            </div>

            {/* Desktop Surrounding Corner Badges (>= lg) */}
            <div className="pointer-events-none absolute -inset-x-20 -inset-y-6 hidden lg:block">
              {/* Top-Left Pill: FINE-TUNING THOUGHTS */}
              <div className="pointer-events-auto absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="-rotate-[14.4deg] hover:-rotate-6 hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <span className="ca-mono inline-block rounded-full border-[3px] border-white px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#191510] shadow-[0_4px_10px_rgba(25,21,16,0.25)] bg-[#c4b5fd]">
                    FINE-TUNING THOUGHTS
                  </span>
                </div>
              </div>

              {/* Top-Right Pill: EXPLORING LATENT SPACES */}
              <div className="pointer-events-auto absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
                <div className="rotate-[12.6deg] hover:rotate-6 hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <span className="ca-mono inline-block rounded-full border-[3px] border-white px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#191510] shadow-[0_4px_10px_rgba(25,21,16,0.25)] bg-[#f3e2ad]">
                    EXPLORING LATENT SPACES
                  </span>
                </div>
              </div>

              {/* Bottom-Left Badge: AI/ML Engineer + Curved Arrow */}
              <div className="pointer-events-auto absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2">
                <div className="-rotate-[7.2deg] hover:-rotate-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <span className="relative inline-block">
                    <span className="ca-hand inline-block px-4 py-2 leading-snug text-[#191510] shadow-[2px_3px_8px_rgba(17,18,18,0.18)] text-2xl font-bold bg-[#f7c948]">
                      AI/ML Engineer
                    </span>
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="#191510"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute -right-7 -top-4 h-8 w-8 -scale-x-100"
                      aria-hidden="true"
                    >
                      <path d="M34 33 C 25 24, 15 21, 9 9" />
                      <path d="M8 21 L 7 7 L 21 11" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Bottom-Right Badge: Mumbai, India + Curved Arrow */}
              <div className="pointer-events-auto absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
                <div className="rotate-[3.6deg] hover:rotate-1 hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <span className="relative inline-block">
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="#191510"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute -left-6 -top-6 h-8 w-8"
                      aria-hidden="true"
                    >
                      <path d="M34 33 C 25 24, 15 21, 9 9" />
                      <path d="M8 21 L 7 7 L 21 11" />
                    </svg>
                    <span className="ca-hand inline-block px-4 py-2 leading-snug text-[#191510] shadow-[2px_3px_8px_rgba(17,18,18,0.18)] text-2xl font-bold bg-[#a9dfc6]">
                      Mumbai-101, India
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status ribbon below name */}
          <p className="hero-badge-in ca-mono mt-6 inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#191510]">
            <span className="h-3 w-3 rounded-full bg-[#2b57d6] animate-pulse" />
            OPEN TO NEW WORK AND GOOD PROBLEMS
          </p>

          {/* Interactive Invert Lens that follows the cursor */}
          <span
            ref={lensRef}
            aria-hidden="true"
            className="ca-invert-lens pointer-events-none absolute left-0 top-0 z-30 hidden h-72 w-72 lg:block"
          >
            <span className="absolute -left-2 -top-2 h-4 w-4 bg-[#191510]" />
            <span className="absolute -right-2 -top-2 h-4 w-4 bg-[#191510]" />
            <span className="absolute -bottom-2 -left-2 h-4 w-4 bg-[#191510]" />
            <span className="absolute -bottom-2 -right-2 h-4 w-4 bg-[#191510]" />
          </span>
        </div>

        {/* Mobile Bottom Badges (< lg) */}
        <div className="hero-badge-in mt-8 flex flex-wrap items-center justify-center gap-5 lg:hidden">
          <div className="-rotate-[5.4deg] hover:-rotate-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
            <span className="ca-hand inline-block px-4 py-2 leading-snug text-[#191510] shadow-[2px_3px_8px_rgba(17,18,18,0.18)] text-xl sm:text-2xl font-bold bg-[#f7c948]">
              AI/ML Engineer
            </span>
          </div>
          <div className="rotate-[3.6deg] hover:rotate-1 hover:scale-105 transition-transform duration-200 cursor-pointer">
            <span className="ca-hand inline-block px-4 py-2 leading-snug text-[#191510] shadow-[2px_3px_8px_rgba(17,18,18,0.18)] text-xl sm:text-2xl font-bold bg-[#a9dfc6]">
              Mumbai-101, India
            </span>
          </div>
        </div>

        {/* Value Proposition Headline with refined, balanced font size */}
        <h1 className="hero-statement-in mt-8 sm:mt-10 max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-[1.25] tracking-tight text-[#191510]">
          <span>I build intelligent agents that </span>
          <svg
            viewBox="0 0 40 40"
            className="inline-block align-[-0.08em] ca-spin-slow h-[0.85em] w-[0.85em]"
            aria-hidden="true"
          >
            <circle cx="20" cy="20" r="18" fill="#16b06a" stroke="#191510" strokeWidth="2" />
            <circle cx="20" cy="20" r="11" fill="#ECE8DF" />
            <circle cx="20" cy="20" r="5" fill="#16b06a" />
            <circle cx="14" cy="9" r="2.4" fill="#191510" />
          </svg>{' '}
          <br className="hidden sm:inline" />
          <span>solve real-world problems. </span>
          <svg
            viewBox="0 0 40 40"
            className="inline-block align-[-0.08em] ca-spin-slow h-[0.85em] w-[0.85em]"
            aria-hidden="true"
          >
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff4d8d" transform="rotate(0 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff4d8d" transform="rotate(45 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff4d8d" transform="rotate(90 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff4d8d" transform="rotate(135 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff4d8d" transform="rotate(180 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff4d8d" transform="rotate(225 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff4d8d" transform="rotate(270 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff4d8d" transform="rotate(315 20 20)" />
            <circle cx="20" cy="20" r="4" fill="#191510" />
          </svg>
        </h1>

        {/* Primary CTA Button — Directs to Resume on Google Drive */}
        <a
          className="hero-statement-in group/cta ca-mono relative mt-9 inline-flex items-center gap-3 border-2 border-[#191510] bg-[#191510] py-2.5 pl-2.5 pr-6 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-transparent hover:text-[#191510] shadow-[3px_3px_0px_#191510] active:translate-x-0.5 active:translate-y-0.5"
          href="https://drive.google.com/file/d/1sf7WAwoaEEDxu6InMKJBbm20Btcx3yqw/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex h-9 w-9 items-center justify-center bg-[#2b57d6] text-[#191510] transition-colors duration-200 group-hover/cta:bg-[#ff4d8d] group-hover/cta:text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
          MY BLUEPRINT
        </a>
      </div>
    </section>
  );
}
