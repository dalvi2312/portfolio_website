'use client';

import { useRef } from 'react';

const line1Logos = [
  { name: 'LangGraph', src: '/tech_stickers/langgraph.png' },
  { name: 'LangChain', src: '/tech_stickers/langchain.png' },
  { name: 'Hugging Face', src: '/tech_stickers/huggingface.png' },
  { name: 'vLLM', src: '/tech_stickers/vllm.png' },
  { name: 'SBERT', src: '/tech_stickers/sbert.png' },
  { name: 'TensorFlow', src: '/tech_stickers/tensorflow.png' },
  { name: 'Scikit-learn', src: '/tech_stickers/scikitlearn.png' },
];

const line2Logos = [
  { name: 'LanceDB', src: '/tech_stickers/lancedb.png' },
  { name: 'Chroma', src: '/tech_stickers/chroma.png' },
  { name: 'MCP', src: '/tech_stickers/mcp.png' },
  { name: 'OpenCV', src: '/tech_stickers/opencv.png' },
  { name: 'PostgreSQL', src: '/tech_stickers/postgresql.png' },
  { name: 'SQL', src: '/tech_stickers/sql.png' },
  { name: 'MinIO', src: '/tech_stickers/minio.png' },
];

const line3Logos = [
  { name: 'Python', src: '/tech_stickers/python.png' },
  { name: 'FastAPI', src: '/tech_stickers/fastapi.png' },
  { name: 'Docker', src: '/tech_stickers/docker.png' },
  { name: 'Kubeflow', src: '/tech_stickers/kubeflow.png' },
  { name: 'JavaScript', src: '/tech_stickers/javascript.png' },
  { name: 'Git', src: '/tech_stickers/git.png' },
  { name: 'PyTorch', src: '/tech_stickers/pytorch.png' },
];

// Casual sticker tilt angles to give hand-slapped appearance
const stickerTilts = [-3, 2.5, -2, 3.2, -3.5, 2, -1.8];

function CarouselRow({
  logos,
  direction,
  className = '',
}: {
  logos: typeof line1Logos;
  direction: 'left' | 'right';
  className?: string;
}) {
  return (
    <div className={`marquee-line relative w-full overflow-visible ${className}`}>
      <div
        className={`marquee-track flex w-max items-center ${
          direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'
        }`}
      >
        {/* Set 1 */}
        <div className="flex items-center gap-10 sm:gap-14 md:gap-18 pr-10 sm:pr-14 md:pr-18 shrink-0">
          {logos.map((tech, idx) => {
            const tilt = stickerTilts[idx % stickerTilts.length];

            return (
              <div
                key={`a-${idx}`}
                className="tech-sticker-item relative flex flex-col items-center justify-center shrink-0 cursor-pointer select-none px-3 py-2"
                style={{
                  transform: `rotate(${tilt}deg)`,
                }}
                title={tech.name}
              >
                {/* Sticker Graphic - clean die-cut white outline (no corner artifacts or triangles) */}
                <div className="relative inline-flex items-center justify-center p-1 pointer-events-none">
                  <img
                    alt={tech.name}
                    src={tech.src}
                    width={64}
                    height={48}
                    className="tech-sticker-img h-9 sm:h-11 md:h-12 w-auto max-w-[130px] sm:max-w-[155px] md:max-w-[180px] object-contain pointer-events-none"
                    loading="eager"
                  />
                </div>

                {/* Skill Name Pill - 100% visible, centered, ample clearance, never clipped */}
                <span className="tech-sticker-pill font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-black border border-white/20 px-3 py-1 rounded shadow-[2px_2px_0px_#FF6332] whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Set 2 (Identical clone for seamless 50% infinite loop) */}
        <div
          className="flex items-center gap-10 sm:gap-14 md:gap-18 pr-10 sm:pr-14 md:pr-18 shrink-0"
          aria-hidden="true"
        >
          {logos.map((tech, idx) => {
            const tilt = stickerTilts[idx % stickerTilts.length];

            return (
              <div
                key={`b-${idx}`}
                className="tech-sticker-item relative flex flex-col items-center justify-center shrink-0 cursor-pointer select-none px-3 py-2"
                style={{
                  transform: `rotate(${tilt}deg)`,
                }}
                title={tech.name}
              >
                {/* Sticker Graphic - clean die-cut white outline (no corner artifacts or triangles) */}
                <div className="relative inline-flex items-center justify-center p-1 pointer-events-none">
                  <img
                    alt={tech.name}
                    src={tech.src}
                    width={64}
                    height={48}
                    className="tech-sticker-img h-9 sm:h-11 md:h-12 w-auto max-w-[130px] sm:max-w-[155px] md:max-w-[180px] object-contain pointer-events-none"
                    loading="eager"
                  />
                </div>

                {/* Skill Name Pill - 100% visible, centered, ample clearance, never clipped */}
                <span className="tech-sticker-pill font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-black border border-white/20 px-3 py-1 rounded shadow-[2px_2px_0px_#FF6332] whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function TechArsenal() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-neutral-900 bg-linen paper-texture relative z-10 scroll-mt-20 md:scroll-mt-24 overflow-hidden"
      id="skills"
    >
      {/* 
        High-Performance Hardware-Accelerated Infinite Marquee CSS:
        - Uses translate3d with GPU layer promotion (backface-visibility, will-change)
        - Zero CSS filter recalculations during hover (die-cut white border is baked into image)
        - Single fast drop shadow for 3D paper depth
        - Tooltip pill fully visible without clipping
      */}
      <style>{`
        @keyframes techMarqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes techMarqueeRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .marquee-track-left {
          display: flex !important;
          width: max-content !important;
          animation: techMarqueeLeft 28s linear infinite !important;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        .marquee-track-right {
          display: flex !important;
          width: max-content !important;
          animation: techMarqueeRight 28s linear infinite !important;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        @media (max-width: 640px) {
          .marquee-track-left,
          .marquee-track-right {
            animation-duration: 20s !important;
          }
        }

        .marquee-line {
          position: relative;
          z-index: 10;
        }

        /* Elevate hovered row above siblings so pills never get obscured */
        .marquee-line:hover {
          z-index: 50 !important;
        }

        /* Seamless pause on hover with 0ms overhead */
        .marquee-line:hover .marquee-track-left,
        .marquee-line:hover .marquee-track-right {
          animation-play-state: paused !important;
        }

        /* 
         * Sticker graphic: static single GPU-accelerated paper depth shadow
         * Never transitioned, never recalculated during hover.
         */
        .tech-sticker-img {
          filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.22));
          pointer-events: none;
          user-select: none;
        }

        /* 
         * Sticker Item: pure GPU transform on hover
         * transform is executed on the compositor thread with 0ms CPU time
         */
        .tech-sticker-item {
          will-change: transform;
          transform-origin: center center;
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tech-sticker-item:hover {
          transform: scale(1.14) rotate(0deg) !important;
          z-index: 60 !important;
        }

        /* 
         * Name pill tooltip:
         * Positioned 8px below sticker, z-index 70, completely unclipped by overflow-visible on rows
         */
        .tech-sticker-pill {
          position: absolute;
          top: 100%;
          margin-top: 8px;
          left: 50%;
          transform: translate(-50%, 4px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          white-space: nowrap;
          z-index: 70;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .tech-sticker-item:hover .tech-sticker-pill {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translate(-50%, 0) !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header Block matching "How I Can Help You" base reference font scale */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 md:mb-20 pb-8 border-b border-black/15">
          <div>
            <div className="inline-block mb-5 sm:mb-6">
              <span className="bg-black text-white text-[10px] md:text-xs font-mono font-bold px-3 py-1 rounded-none uppercase tracking-widest shadow-[2px_2px_0px_#FF6332]">
                [ ARSENAL &amp; TECH STACK ]
              </span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[96px] font-display uppercase tracking-tight text-neutral-900 leading-none"
              style={{ fontWeight: 400 }}
            >
              TECHNICAL ARSENAL
            </h2>
          </div>
          <p className="max-w-md text-neutral-700 text-xs md:text-sm leading-relaxed font-mono">
            The battle-tested frameworks, vector databases, and inference engines powering my production pipelines.
          </p>
        </div>

        {/* 3-Line Infinite Carousel Queue */}
        <div className="relative w-full overflow-hidden space-y-4 sm:space-y-6 pb-6 sm:pb-8">
          {/* Studio Edge Fade Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#ECE8DF] via-[#ECE8DF]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#ECE8DF] via-[#ECE8DF]/80 to-transparent z-20" />

          {/* Line 1: Top Line moving Left */}
          <CarouselRow logos={line1Logos} direction="left" className="py-3 sm:py-4" />

          {/* Line 2: Middle Line moving Right (opposite direction) */}
          <CarouselRow logos={line2Logos} direction="right" className="py-3 sm:py-4" />

          {/* Line 3: Bottom Line moving Left (same direction as top line) */}
          <CarouselRow logos={line3Logos} direction="left" className="pt-3 sm:pt-4 pb-12 sm:pb-16" />
        </div>
      </div>
    </section>
  );
}
