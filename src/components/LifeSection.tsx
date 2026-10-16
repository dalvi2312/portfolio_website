'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LifeImage {
  id: number;
  src: string;
  alt: string;
  location: string;
  quote: string;
}

const lifeImages: LifeImage[] = [
  {
    id: 1,
    src: '/images/life_images/1.webp',
    alt: 'Durgesh Dalvi at Hampi Summit',
    location: 'Hampi Summit',
    quote:
      'Perched high above the sun-drenched granite boulders of Hampi, where ancient empires meet infinite horizons. A quiet summit that restores perspective far beyond the reach of glowing screens.',
  },
  {
    id: 2,
    src: '/images/life_images/2.webp',
    alt: 'Trek Squad on Sahyadri Ridge',
    location: 'Sahyadri Range',
    quote:
      'Winds whipping past saffron flags along the rugged Sahyadri ridges. No latency, no models—just the raw pulse of the mountains conquered step by step with the brothers who keep me grounded.',
  },
  {
    id: 3,
    src: '/images/life_images/3.webp',
    alt: 'Ancient Heritage Architecture & Boulders',
    location: 'Badami Cliffs',
    quote:
      'Red sandstone cliffs sculpted by centuries, overlooking the still, ancient waters of Badami. A timeless pause where history breathes, teaching a calm depth no algorithm can ever synthesize.',
  },
  {
    id: 4,
    src: '/images/life_images/4.webp',
    alt: 'College Squad Celebration',
    location: 'Friendship & Milestones',
    quote:
      'The irreplaceable constants in a fast-moving world—friendships forged long before code and cherished across every milestone. Dressed in laughter and shared dreams, celebrating life’s purest chapters together.',
  },
  {
    id: 5,
    src: '/images/life_images/5.webp',
    alt: 'Hampi Utsav Temple Chariot Procession',
    location: 'Hampi Heritage',
    quote:
      'The towering majesty of temple chariots rising against twilight skies, carried by the roar of living folklore. Immersed in the vibrant pulse of heritage, where ancient tradition echoes louder than any machine.',
  },
];

function getArcParameters(width: number) {
  if (width < 480) {
    return {
      radius: 320,
      angleStepDeg: 26,
    };
  }
  if (width < 768) {
    return {
      radius: 430,
      angleStepDeg: 28,
    };
  }
  if (width < 1024) {
    return {
      radius: 520,
      angleStepDeg: 30,
    };
  }
  if (width < 1440) {
    return {
      radius: 620,
      angleStepDeg: 30,
    };
  }
  return {
    radius: 700,
    angleStepDeg: 30,
  };
}

export default function LifeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const goToCard = useCallback((targetIndex: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const maxProg = lifeImages.length - 1;
    const targetScroll = st.start + (targetIndex / maxProg) * (st.end - st.start);

    const globalLenis = (window as unknown as {
      lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void };
    }).lenis;

    if (globalLenis) {
      globalLenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current;
    const quotes = quoteRefs.current;
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const maxProgress = lifeImages.length - 1; // 4
      const progressProxy = { value: 0 };

      const updateScene = (progress: number) => {
        const width = window.innerWidth;
        const { radius, angleStepDeg } = getArcParameters(width);
        const angleStepRad = (angleStepDeg * Math.PI) / 180;

        // 1. Update Cards Transforms along semi-circular arc
        cards.forEach((card, i) => {
          if (!card) return;
          const diff = i - progress;
          const theta = diff * angleStepRad;
          const x = radius * Math.sin(theta);
          const y = radius * (1 - Math.cos(theta));
          const rot = diff * angleStepDeg;
          const scale = Math.max(0.84, 1 - Math.abs(diff) * 0.05);

          // Card Opacity calculation
          let opacity = 1;
          if (diff > 0) {
            if (diff <= 1.0) {
              opacity = 1.0;
            } else if (diff <= 2.2) {
              opacity = 1.0 - (diff - 1.0) * (0.35 / 1.2);
            } else if (diff <= 2.8) {
              opacity = 0.65 - (diff - 2.2) * (0.65 / 0.6);
            } else {
              opacity = 0;
            }
          } else if (diff < 0) {
            if (diff >= -0.6) {
              opacity = 1.0;
            } else if (diff >= -1.2) {
              opacity = 1.0 - (-diff - 0.6) * (1.0 / 0.6);
            } else {
              opacity = 0;
            }
          }

          const clampedOpacity = Math.max(0, Math.min(1, opacity));

          gsap.set(card, {
            x,
            y,
            rotation: rot,
            scale,
            opacity: clampedOpacity,
            visibility: clampedOpacity > 0.01 ? 'visible' : 'hidden',
            pointerEvents: clampedOpacity > 0.1 ? 'auto' : 'none',
          });
        });

        // 2. Update Synchronized Poetic Subtitle Quotes (Constant-power smooth crossfade)
        quotes.forEach((quoteEl, i) => {
          if (!quoteEl) return;
          const diff = i - progress;
          let textOpacity = 0;
          let textY = 0;

          if (Math.abs(diff) < 1.0) {
            textOpacity = Math.cos(diff * (Math.PI / 2)) ** 2;
            textY = -diff * 14; // Subtle upward glide as photo exits
          }

          gsap.set(quoteEl, {
            opacity: textOpacity,
            y: textY,
            visibility: textOpacity > 0.01 ? 'visible' : 'hidden',
          });
        });
      };

      // Set initial positions immediately
      updateScene(0);

      // Create ScrollTrigger pin & scrub
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=2600',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const currentProg = self.progress * maxProgress;
          progressProxy.value = currentProg;
          updateScene(currentProg);

          // Update React active index state when card index shifts
          const active = Math.min(maxProgress, Math.max(0, Math.round(currentProg)));
          if (active !== activeIndexRef.current) {
            activeIndexRef.current = active;
            setActiveIndex(active);
          }
        },
      });

      scrollTriggerRef.current = st;

      // Handle window resize dynamically
      const handleResize = () => {
        updateScene(progressProxy.value);
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggerRef.current = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="life"
      data-theme="dark"
      className="relative w-full bg-ink-deep text-white min-h-screen h-screen flex flex-col items-center justify-between pt-6 pb-4 sm:pt-8 sm:pb-6 md:pt-10 md:pb-8 px-4 sm:px-6 md:px-12 overflow-hidden border-t border-neutral-900 select-none scroll-mt-0"
    >
      {/* Grigoletti Grain Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Top Header Block */}
      <div className="relative z-20 text-center max-w-4xl mx-auto w-full shrink-0">
        {/* Badge */}
        <div className="inline-block mb-5 sm:mb-6">
          <span className="bg-[#121212]/90 text-neutral-300 text-[10px] sm:text-xs font-mono font-bold px-3 py-1 uppercase tracking-widest border border-[#FF6332]/60 shadow-[2px_2px_0px_#FF6332] rounded-[2px]">
            [ LIFE OUTSIDE THE TERMINAL ]
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[88px] font-display uppercase tracking-tight text-white leading-none"
          style={{ fontWeight: 400 }}
        >
          Colors of the real world
        </h2>

        {/* Dynamic Synchronized Subtitle Quotes with fixed height */}
        <div className="relative w-full max-w-2xl md:max-w-3xl mx-auto h-16 sm:h-18 md:h-20 flex items-center justify-center mt-3 sm:mt-4">
          {lifeImages.map((img, idx) => (
            <p
              key={img.id}
              ref={(el) => {
                quoteRefs.current[idx] = el;
              }}
              className="absolute inset-0 flex items-center justify-center text-center text-neutral-300 font-sans text-xs sm:text-sm md:text-base leading-relaxed px-4 select-none font-normal"
            >
              {img.quote}
            </p>
          ))}
        </div>
      </div>

      {/* Center Cards Stage with Generous Gap from Header Subtitle */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center overflow-visible mt-6 sm:mt-8 md:mt-12 mb-2 sm:mb-4">
        <div
          ref={stageRef}
          className="relative w-[230px] xs:w-[260px] sm:w-[290px] md:w-[330px] lg:w-[360px] aspect-[3/4] flex items-center justify-center"
        >
          {lifeImages.map((img, idx) => (
            <div
              key={img.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => goToCard(idx)}
              style={{ zIndex: 50 - idx * 5 }}
              className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.9)] cursor-pointer will-change-transform bg-neutral-900 transition-shadow duration-300 hover:shadow-[0_30px_70px_rgba(0,0,0,1)]"
            >
              <img
                src={img.src}
                alt={img.alt}
                width={1200}
                height={1600}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading={idx <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Progress Navigation */}
      <div className="relative z-20 flex flex-col items-center gap-3 pb-2 sm:pb-4 shrink-0">
        <div className="flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-800 shadow-lg">
          {lifeImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => goToCard(idx)}
              aria-label={`View photo ${idx + 1}: ${img.location}`}
              className="group relative p-2 flex items-center justify-center focus:outline-hidden"
            >
              <span
                className={`block h-2 transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? 'w-7 bg-[#FF6332]'
                    : 'w-2 bg-neutral-600 group-hover:bg-neutral-400'
                }`}
              />
            </button>
          ))}
          <span className="text-[11px] font-mono font-medium text-neutral-400 ml-1.5 tabular-nums">
            0{activeIndex + 1} / 0{lifeImages.length}
          </span>
        </div>
      </div>
    </section>
  );
}
