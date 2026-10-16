'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BrandLogo from './BrandLogo';

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const dashContainerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const percentEndRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const masterTL = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        },
      });

      /* ─── Phase 1: Logo Pop-in ─── */
      masterTL.fromTo(
        logoRef.current,
        { scale: 0, opacity: 0, rotation: -12 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'back.out(1.7)',
        }
      );

      /* ─── Phase 2: 10 dashes light up one by one across ~0.8 seconds ─── */
      const dashes = dashContainerRef.current?.querySelectorAll('.loading-dash');
      if (dashes && dashes.length > 0) {
        masterTL.to(
          dashes,
          {
            backgroundColor: '#111111',
            stagger: 0.08,
            duration: 0.08,
            ease: 'power1.inOut',
          },
          '+=0.1'
        );
      }

      /* ─── Phase 3: "The Journey Of Curiosity" fade-in ─── */
      if (taglineRef.current) {
        masterTL.fromTo(
          taglineRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.6'
        );
      }

      /* ─── Phase 4: "1%" appears only when the bar is fully loaded ─── */
      if (percentEndRef.current) {
        masterTL.fromTo(
          percentEndRef.current,
          { opacity: 0, scale: 0.75, x: -3 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.25,
            ease: 'back.out(1.8)',
          },
          '>-0.05'
        );
      }

      /* ─── Hold pause to let user see completed 1% state ─── */
      masterTL.to({}, { duration: 0.2 });

      /* ─── Phase 5: Smooth Roll-Up Reveal ─── */
      if (overlayRef.current) {
        masterTL.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.55,
          ease: 'power3.inOut',
        });
      }
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="loading-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center will-change-transform"
      style={{ backgroundColor: '#ECE8DF' }}
    >
      {/* Background Pattern — topographic contour map */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'url(/bg-pattern.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 px-6">
        {/* Logo */}
        <div ref={logoRef} className="opacity-0 flex items-center justify-center">
          <BrandLogo isDarkBackground={false} className="h-16 sm:h-20 md:h-24 w-auto drop-shadow-sm" />
        </div>

        {/* 10-Dash Loading Bar with 0% / 1% labels */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* 0% — always visible */}
          <span className="font-mono text-xs sm:text-sm font-bold text-[#191510] tracking-wider select-none">
            0%
          </span>

          <div
            ref={dashContainerRef}
            className="flex items-center gap-[6px] sm:gap-2"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="loading-dash h-[3px] sm:h-[4px] w-6 sm:w-8 md:w-10 rounded-full"
                style={{ backgroundColor: 'rgba(25, 21, 16, 0.15)' }}
              />
            ))}
          </div>

          {/* 1% — appears only when loading completes */}
          <span
            ref={percentEndRef}
            className="font-mono text-xs sm:text-sm font-bold text-[#191510] tracking-wider select-none opacity-0"
          >
            1%
          </span>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#191510] tracking-wide opacity-0 select-none"
        >
          The Journey Of Curiosity
        </p>
      </div>
    </div>
  );
}
