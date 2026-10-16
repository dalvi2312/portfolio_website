'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01.',
    title: 'Agentic AI & LLMs',
    description:
      'Intelligent autonomous agents, RAG architectures, and multi-model reasoning pipelines that automate reasoning, query live databases in plain English, and streamline core operations.',
    skills: [
      'Multi-Agent Orchestration (LangGraph, CrewAI)',
      'RAG & Vector Search (LanceDB, Qdrant, ChromaDB)',
      'Text-to-SQL & Semantic Caching (vLLM, GGUF, AWQ)',
    ],
  },
  {
    number: '02.',
    title: 'Computer Vision & Edge AI',
    description:
      'Real-time object detection, inspection, and edge inference pipelines deployed directly to production hardware and edge devices for rapid, zero-latency defect detection and automated counting.',
    skills: [
      'Industrial Object Detection (RT-DETR, YOLO)',
      'Quality Inspection & Video Processing',
      'On-Prem & Edge Optimization (NVIDIA RTX, TensorRT)',
    ],
  },
  {
    number: '03.',
    title: 'MLOps & Scalable Backend',
    description:
      'End-to-end machine learning infrastructure from dataset labeling and fine-tuning to high-throughput async microservices, schema validation, and on-prem deployments.',
    skills: [
      'Async Microservices (FastAPI, PostgreSQL, Python)',
      'Containerization & Infrastructure (Docker, Kubeflow, MinIO)',
      'Model Serving & Quantization (vLLM, AWQ, GGUF)',
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToCard = (idx: number) => {
    const el = cardRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle reveal animation for header when scrolling into view
      gsap.from('.services-title', {
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.services-context-block', {
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="w-full bg-[#0D0D0D] text-white pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24 md:pb-28 px-5 sm:px-8 md:px-12 lg:px-20 border-t border-neutral-900 select-none relative scroll-mt-20 md:scroll-mt-24"
      id="services"
    >
      {/* Grigoletti Grain Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 
        Sticky Overlapping Cards Top Positioning:
        Calculated to ensure each card header remains 100% visible with ample breathing space
      */}
      <style>{`
        /* Mobile: 68px base, 68px step */
        .card-sticky-0 {
          top: 68px;
        }
        .card-sticky-1 {
          top: 136px;
        }
        .card-sticky-2 {
          top: 204px;
        }

        /* Tablet (>=640px): 80px base, 86px step */
        @media (min-width: 640px) {
          .card-sticky-0 {
            top: 80px;
          }
          .card-sticky-1 {
            top: 166px;
          }
          .card-sticky-2 {
            top: 252px;
          }
        }

        /* Desktop (>=1024px): 92px base, 108px step */
        @media (min-width: 1024px) {
          .card-sticky-0 {
            top: 92px;
          }
          .card-sticky-1 {
            top: 200px;
          }
          .card-sticky-2 {
            top: 308px;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        {/* Header Block: Oversized Title + Context Info matching Grigoletti */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12 mb-16 sm:mb-20 md:mb-24">
          {/* Big display title anchored at top left */}
          <div className="w-full lg:max-w-2xl xl:max-w-3xl text-left">
            <div className="inline-block mb-5 sm:mb-6">
              <span className="bg-neutral-800 text-neutral-300 text-[10px] md:text-xs font-mono font-bold px-3 py-1 rounded-none uppercase tracking-widest border border-neutral-700 shadow-[2px_2px_0px_#FF6332]">
                [ SERVICES &amp; EXPERTISE ]
              </span>
            </div>
            <h2
              className="services-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[96px] font-display uppercase tracking-tight text-white flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 break-words"
              style={{ fontWeight: 400 }}
            >
              <span className="block leading-none">HOW I CAN HELP</span>
              <span className="block leading-none">YOU</span>
            </h2>
          </div>

          {/* Subtitle / Context Block matching Grigoletti */}
          <div className="services-context-block w-full lg:max-w-md xl:max-w-lg flex flex-col gap-3 lg:pt-3">
            <div className="inline-block">
              <span className="bg-neutral-800 text-neutral-300 text-[10px] sm:text-xs font-mono font-semibold px-2.5 py-1 rounded uppercase tracking-wider">
                SERVICE
              </span>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Frustrated because your systems struggle with messy unstructured data, slow workflows, or lack intelligent automation?
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
              I engineer production-ready AI systems, agentic pipelines, and computer vision models that turn complex enterprise data into autonomous impact.
            </p>
          </div>
        </div>

        {/* 
          Sticky Overlapping Stacking Cards Container:
          - Pure hardware-accelerated position: sticky
          - Generous scroll runway between cards for tactile overlap
          - Deep physical drop shadows and top borders
        */}
        <div className="w-full flex flex-col space-y-24 sm:space-y-36 lg:space-y-48 pb-16 sm:pb-24">
          {services.map((service, idx) => {
            const zIndex = (idx + 1) * 10;

            return (
              <div
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{
                  zIndex,
                }}
                className={`service-card sticky w-full rounded-none border border-white/15 bg-[#0E0E10] shadow-[0_-20px_45px_rgba(0,0,0,0.95)] px-7 sm:px-10 md:px-14 lg:px-16 pt-9 sm:pt-11 md:pt-14 pb-12 sm:pb-16 md:pb-20 transition-shadow duration-200 card-sticky-${idx}`}
              >
                {/* Header Row: Number + Title + Arrow */}
                <div
                  onClick={() => scrollToCard(idx)}
                  className="flex items-start gap-5 sm:gap-8 md:gap-12 mb-7 sm:mb-8 md:mb-10 cursor-pointer group select-none"
                  role="button"
                  tabIndex={0}
                  title={`Scroll to ${service.title}`}
                >
                  {/* Service Number: 01. / 02. / 03. */}
                  <span
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-tight text-white leading-none select-none w-12 sm:w-16 md:w-20 shrink-0"
                    style={{ fontWeight: 400 }}
                  >
                    {service.number}
                  </span>

                  {/* Service Title + Slanted Corner Arrow ↘ */}
                  <div className="flex-1 min-w-0 flex items-center justify-between pr-1 sm:pr-2">
                    <h3
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display tracking-tight text-white leading-tight group-hover:text-neutral-200 transition-colors"
                      style={{ fontWeight: 400 }}
                    >
                      {service.title}
                    </h3>

                    <div className="shrink-0 pl-4">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-neutral-400 group-hover:text-white transition-colors stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M7 7l10 10m0 0H8m9 0V8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Body: Description & Skills List Indented Under Title */}
                <div className="flex gap-5 sm:gap-8 md:gap-12">
                  {/* Spacer column matching service number */}
                  <div className="w-12 sm:w-16 md:w-20 shrink-0 hidden sm:block" />

                  <div className="flex-1 min-w-0 max-w-3xl">
                    <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 font-sans">
                      {service.description}
                    </p>

                    {/* Numbered Skill Items with Clean Dividers */}
                    <div className="flex flex-col border-t border-b border-white/10 divide-y divide-white/10">
                      {service.skills.map((skill, skillIdx) => (
                        <div
                          key={skillIdx}
                          className="py-3 sm:py-3.5 flex items-center gap-4 sm:gap-6 px-1 hover:bg-white/[0.02] transition-colors"
                        >
                          <span className="text-neutral-500 font-mono text-xs sm:text-sm shrink-0">
                            {String(skillIdx + 1).padStart(2, '0')}
                          </span>
                          <span
                            className="text-white font-display text-base sm:text-lg md:text-xl tracking-wide uppercase"
                            style={{ fontWeight: 400 }}
                          >
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
