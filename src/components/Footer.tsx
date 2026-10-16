'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrandLogo from './BrandLogo';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-name', {
        scrollTrigger: {
          trigger: '.footer-name',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      data-theme="dark"
      className="w-full bg-ink-deep text-white pt-16 md:pt-20 pb-10 px-6 md:px-12 lg:px-20 border-t border-neutral-900 select-none relative overflow-hidden"
    >
      {/* Grigoletti Grain Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[340px] relative z-10">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-8 gap-6">
          <div>
            <a className="hover:text-white transition-colors font-medium" href="mailto:durgesh.dalvi23@gmail.com">
              durgesh.dalvi23@gmail.com
            </a>
            <span className="mx-3 text-neutral-600">•</span>
            <span>© 2026 Durgesh Dalvi</span>
          </div>
          <div className="flex items-center gap-6 uppercase tracking-wider flex-wrap">
            <a className="hover:text-white transition-colors min-h-[44px] inline-flex items-center py-2" href="https://github.com" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a className="hover:text-white transition-colors min-h-[44px] inline-flex items-center py-2" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            <a className="hover:text-white transition-colors min-h-[44px] inline-flex items-center py-2" href="mailto:durgesh.dalvi23@gmail.com">EMAIL</a>
          </div>
          <div className="flex items-center gap-6 uppercase tracking-wider flex-wrap">
            <a className="hover:text-white transition-colors min-h-[44px] inline-flex items-center py-2" href="#">ABOUT</a>
            <a className="hover:text-white transition-colors min-h-[44px] inline-flex items-center py-2" href="#skills">STACK</a>
            <a className="hover:text-white transition-colors min-h-[44px] inline-flex items-center py-2" href="#projects">WORK</a>
            <a className="hover:text-white transition-colors min-h-[44px] inline-flex items-center py-2" href="#life">LIFE</a>
            <a className="hover:text-white transition-colors min-h-[44px] inline-flex items-center py-2" href="#contact">CONTACT</a>
          </div>
        </div>

        {/* Giant Wordmark */}
        <div className="footer-name py-12 md:py-16 flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-baseline gap-4 md:gap-8 flex-wrap">
            <h1
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] tracking-tight text-white leading-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: '-0.04em' }}
            >
              Durgesh
            </h1>
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-serif italic text-neutral-400 leading-none">
              Dalvi<span className="text-accent-royal not-italic">.</span>
            </h1>
          </div>

          {/* Footer Logo */}
          <div className="w-12 h-12 md:w-16 md:h-16 opacity-80 flex items-center justify-center">
            <BrandLogo isDarkBackground={true} className="w-full h-full" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 pt-8 border-t border-neutral-900 gap-4">
          <p>Made quietly, from Mumbai.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for select AI engineering &amp; consulting</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
