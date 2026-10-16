'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-title', {
        scrollTrigger: {
          trigger: '.cta-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.cta-buttons', {
        scrollTrigger: {
          trigger: '.cta-buttons',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="w-full bg-linen py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-neutral-900 paper-texture select-none scroll-mt-20 md:scroll-mt-24"
      id="contact"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-ink-deep text-white rounded-none border-2 border-black p-10 sm:p-14 md:p-20 text-center shadow-[6px_6px_0px_#111111] relative overflow-hidden">
          {/* Grigoletti Grain Texture Overlay */}
          <div className="noise-overlay" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center">
            <p className="text-neutral-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-5 sm:mb-6">Let&apos;s talk!</p>
            <h2 className="cta-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[96px] font-display uppercase tracking-tight text-white mb-8 md:mb-10 leading-none" style={{ fontWeight: 400 }}>
              READY FOR YOUR NEXT AI PROJECT?
            </h2>
            <div className="cta-buttons flex flex-wrap items-center justify-center gap-4">
              <a
                className="inline-flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-none font-mono font-bold text-xs md:text-sm tracking-wider uppercase border-2 border-white hover:bg-neutral-200 transition-all shadow-[3px_3px_0px_#FF6332] active:scale-95"
                href="mailto:durgesh.dalvi23@gmail.com"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-neutral-400">
                  <img
                    alt="Durgesh Dalvi avatar"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoLTtTq_U5ZIJnsvi4GrEDH7uqPhuDAFbPz0OUiwm0m6zIzN8jfy1XsC9V65F4fPT3rorkUYj-w2nyF7nEwZlrSjKE3raod6VYutMaaejtY8ND7JIbS6vspXZXYz2INa8DCQx2NubTQud8zZ57byZdhGQp3R-DUm6KznsamPBGfnO89JdxwXzR8A0ORgjkH_oOFX8A01lCISU5v2WUh1qL4DoJeEgJylgzLIj3VfWTATnI6zxfdiMsHMzHqpDTlZjHefU"
                  />
                </div>
                <span>BOOK A CALL / EMAIL</span>
              </a>
              <a
                className="inline-flex items-center gap-2 bg-transparent text-white px-6 py-3.5 rounded-none font-mono font-bold text-xs md:text-sm tracking-wider uppercase border-2 border-neutral-700 hover:border-white transition-colors"
                href="#projects"
              >
                <span>EXPLORE WORK ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
