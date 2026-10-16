'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetail {
  id: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  statusColor: 'emerald' | 'cyan';
  link: string;
  metrics: { label: string; val: string }[];
  bullets: { title: string; text: string }[];
  techStack: string[];
}

interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  location: string;
  date: string;
  description: string;
  tags: string[];
  extraTags: string;
  logoSrc: string;
  logoBg: string;
  logoFill: boolean;
  projects?: ProjectDetail[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'LeanQubit AI',
    role: 'Software Development Engineer - AIML Engineer',
    type: 'Full-time',
    location: 'Mumbai · Hybrid',
    date: 'July 2025 - Present',
    description:
      'Leading AI engineering at LeanQubit across enterprise Vision AI and Agentic LLM systems for manufacturing and industrial B2B SaaS. Architected and deployed two flagship production systems on the factory floor: FactoIQ (autonomous text-to-SQL agent) and FactoVision (industrial computer vision for defect inspection & automated counting).',
    tags: ['Agentic AI', 'Computer Vision', 'LangGraph', 'vLLM', 'RT-DETR', 'PostgreSQL', 'RTX 4090'],
    extraTags: '+10 skills',
    logoSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4wlqP0KrV28UbfEb42xDDGTu3qxq9v2aSryiAxBZ4Wd-TkjEhEybzDXSfYJ-zmMMPx7kqr-nI41t4Hk5zwUhdHZHGfLXDz9Q77W_2Yg5QUdHmfNaCwxTrHbr5UM1fo23a_cpBhya6XUTTRH0SlQbgndS85D0xfFgS6T1XhreVzoHgsAlpopPeq6fi2gRBhLbJvYAwRyM1PiKFJhvACWtdVisv9pqc5TvzC9KlPhXu2_tFUoGnoo3CT8-2WxAQ1FWmaCw',
    logoBg: 'bg-[#18181b]',
    logoFill: true,
    projects: [
      {
        id: 'factoiq',
        name: 'FactoIQ',
        tagline: 'Your AI Analyst for the Shop Floor',
        category: 'Agentic AI · Text-to-SQL · LLM Infrastructure',
        status: 'Live in Production · On-Premise',
        statusColor: 'emerald',
        link: 'https://leanqubit.ai/factoiq',
        metrics: [
          { label: 'Orchestration', val: 'LangGraph + vLLM' },
          { label: 'Compute & Egress', val: '1x RTX 4090 (Zero Egress)' },
          { label: 'Quantization', val: 'AWQ + GGUF Q4' },
          { label: 'Context Window', val: '8,192 Tokens Pruned' },
        ],
        bullets: [
          {
            title: 'LangGraph SQL Synthesis Pipeline',
            text: 'Designed a LangGraph pipeline for plain-English SQL querying of live production data, integrating intent classification using Qwen2.5-7B-Instruct Model, schema-linked SQL generation using Llama-3-sqlcoder via vLLM & strict sqlglot validation.',
          },
          {
            title: 'Multi-Session Memory & Context Pruning',
            text: 'Engineered multi-session agent memory using Cognee 1.0, LanceDB, PostgreSQL, ChromaDB semantic caching, & smart context compression/schema pruning to maintain an 8192-token window.',
          },
          {
            title: 'Zero-Egress Concurrent LLM Serving',
            text: 'Successfully served two concurrent LLMs on a single RTX 4090 with zero network egress utilizing AWQ quantization & GGUF Q4. Paired this on-premise deployment with async httpx for token-by-token streaming to deliver a highly responsive user experience.',
          },
        ],
        techStack: [
          'LangGraph',
          'vLLM',
          'Qwen2.5-7B',
          'Llama-3-sqlcoder',
          'Cognee 1.0',
          'LanceDB',
          'PostgreSQL',
          'ChromaDB',
          'RTX 4090',
          'AWQ / GGUF',
          'sqlglot',
          'async httpx',
        ],
      },
      {
        id: 'factovision',
        name: 'FactoVision',
        tagline: 'Production Count & Quality Inspection',
        category: 'Industrial Computer Vision · SOTA Detection',
        status: 'Deployed on Factory Floor',
        statusColor: 'cyan',
        link: 'https://leanqubit.ai/factovision',
        metrics: [
          { label: 'Vision Model', val: 'SOTA RT-DETR' },
          { label: 'Benchmark', val: 'Outperformed YOLOv11 & MobileNet' },
          { label: 'Video Lifecycle', val: '30 FPS Frame Extraction' },
          { label: 'Integration', val: 'PostgreSQL Real-Time Ejection' },
        ],
        bullets: [
          {
            title: 'SOTA RT-DETR Detection & Quality Pipeline',
            text: 'Engineered industrial object detection & classification pipelines using RT-DETR model, which outperformed YOLOv8/v11 & MobileNetV3, for automated production counting & quality inspection for metal plates, coffee bags, needle defects.',
          },
          {
            title: 'Supervised Learning & Frame Extraction',
            text: 'Managed the complete supervised learning lifecycle, from 30 FPS video-to-frame extraction to precise bounding box annotation via LabelMe.',
          },
          {
            title: 'Factory Floor Automation & On-Site Deployments',
            text: 'Spearheaded team-driven, end-to-end deployments on the factory floor, leveraging multiple on-site client visits to gather operational requirements & ensure seamless technical integration. Deployed real-time inference solutions integrated directly with PostgreSQL to automate live tracking & instantly flag/remove defective items, successfully replacing manual processes.',
          },
        ],
        techStack: [
          'RT-DETR',
          'OpenCV',
          'YOLOv11/v8',
          'MobileNetV3',
          'LabelMe',
          'PostgreSQL',
          'Edge Inference',
          '30 FPS Video Pipeline',
          'Industrial Automation',
        ],
      },
    ],
  },
  {
    company: 'Udyog Suvidha Kendra',
    role: 'AI & Web Solutions Engineer',
    type: 'Internship',
    location: 'Palghar, Maharashtra · Hybrid',
    date: 'Jan 2025 - Jul 2025',
    description:
      'Worked as an AI & Web Solutions Engineer Intern in a hybrid role, building creative, user-centric websites (including blockchain platforms) and implementing AI automation — developed a LinkedIn automation tool and a Leads Management Tool to streamline internal workflows.',
    tags: ['Laravel', 'HTML/CSS', 'AI Automation', 'Blockchain', 'Leads Management'],
    extraTags: '+8 skills',
    logoSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgN9Eiw662zs6ZxSxdD5RiTXWJJybcGbQjvKU93zdWe-tf1ab08GtazKdGsJKblxVNtLz8bajL3Y29g9wZ2gzrKoDYxEz66MAi6No9unCd0xSP-hnUf6KuIt1jM5yI8lQrCDFETN9Ctw-BmONRh2V1izWBXvAq1Oad74aqRS4j9CWuI27rXTfgkoiYQF0KhNUX7x5NaCuB79U4ZGHXHuzho4G33QZ92qO9VN6nd8PWiX_IJCU3rapiY6kLyC0Ltv6fCd0',
    logoBg: 'bg-white',
    logoFill: false,
  },
  {
    company: 'Unarrow Digital Solutions',
    role: 'Web Designer & Developer',
    type: 'Internship',
    location: 'Virar, Maharashtra · Remote',
    date: 'Jun 2024 - Jul 2024',
    description:
      'Worked remotely as a Web Designer, crafting visually engaging and responsive website layouts for a service-based company. Every design was successfully deployed live, reflecting both client satisfaction and a strong grasp of UI/UX principles in action.',
    tags: ['Figma (Software)', 'HTML/CSS', 'UI/UX Design', 'Responsive Web'],
    extraTags: '+4 skills',
    logoSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu9BFhGymmFKrn0ll2ba5Ci49YColxfXGZ42D9I_L2laHuBnsezhPuVdDO3hbx8oOpjIoboOZBUj5o-MpKFJVpcsUIwDzbbrnr2KHLr54GnLjWQHey9PXYxKVrRZIrOKfvnizKs7tiKt0ORzNHwM8A6kS-sMUhymWSoz9saS7Bhp2W8T1a6y7VxGCH18tizX8XzfLwphHU005I_Y1D8BudmvN8zxZ4ZhsQJNwC5N34SqtrHrHM2H2h6JEQ-iI3ujydC7E',
    logoBg: 'bg-white',
    logoFill: false,
  },
];

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProjectTab, setActiveProjectTab] = useState<'all' | 'factoiq' | 'factovision'>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.timeline-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out',
        });
      });

      // Animate the timeline spine growing
      gsap.from('.timeline-line', {
        scrollTrigger: {
          trigger: '.timeline-line',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: 'top center',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="w-full bg-ink-deep text-white py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-neutral-900 relative z-10 select-none scroll-mt-20 md:scroll-mt-24 overflow-hidden"
      id="timeline"
    >
      {/* Grigoletti Grain Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20 pb-8 border-b border-neutral-800">
          <div>
            <div className="inline-block mb-5 sm:mb-6">
              <span className="bg-neutral-800 text-neutral-300 text-[10px] md:text-xs font-mono font-bold px-3 py-1 rounded-none uppercase tracking-widest border border-neutral-700 shadow-[2px_2px_0px_#FF6332]">
                [ CAREER &amp; JOURNEY ]
              </span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[96px] font-display uppercase tracking-tight text-white leading-none"
              style={{ fontWeight: 400 }}
            >
              WORK EXPERIENCE
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-xs md:text-sm leading-relaxed font-mono">
            From engineering production AI agent pipelines and industrial computer vision models to full-stack systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Spine Line */}
          <div className="timeline-line absolute left-7 sm:left-8 top-10 bottom-10 w-0.5 bg-neutral-800 -translate-x-1/2 z-0" />

          <div className="space-y-12 sm:space-y-16 relative z-10">
            {experiences.map((exp, idx) => (
              <div key={idx} className="timeline-card relative flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
                {/* Node */}
                <div
                  className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full ${exp.logoBg} border-2 border-neutral-700 ${
                    exp.logoFill ? '' : 'p-2.5'
                  } overflow-hidden flex items-center justify-center shadow-lg`}
                >
                  <img
                    alt={`${exp.company} logo`}
                    width={64}
                    height={64}
                    className={`${
                      exp.logoFill ? 'w-full h-full object-cover rounded-full' : 'w-full h-full object-contain'
                    }`}
                    src={exp.logoSrc}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 bg-dark-card border border-neutral-800/90 rounded-none p-6 sm:p-8 md:p-10 hover:border-neutral-700 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.4)]">
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl font-display tracking-tight text-white"
                        style={{ fontWeight: 400 }}
                      >
                        {exp.company}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs md:text-sm text-neutral-300 font-mono">
                        <span className="text-white font-semibold">{exp.role}</span>
                        <span>•</span>
                        <span className="text-neutral-400">{exp.type}</span>
                        <span>•</span>
                        <span className="text-neutral-500">{exp.location}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs md:text-sm font-mono text-neutral-300 uppercase tracking-wider bg-neutral-900 border border-neutral-800 px-3 py-1">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
                    {exp.description}
                  </p>

                  {/* Creative Product Dossiers (for LeanQubit AI) */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-neutral-800/90">
                      {/* Section Header & Tab Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#FF6332] animate-ping" />
                          <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-bold">
                            FLAGSHIP PRODUCTION SYSTEMS DELIVERED
                          </span>
                        </div>

                        {/* Interactive Tab Switcher */}
                        <div className="inline-flex items-center bg-black/80 p-1 border border-neutral-800 text-[11px] font-mono">
                          <button
                            type="button"
                            onClick={() => setActiveProjectTab('all')}
                            className={`px-3 py-1 uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                              activeProjectTab === 'all'
                                ? 'bg-[#FF6332] text-black font-bold shadow-sm'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            All ({exp.projects.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveProjectTab('factoiq')}
                            className={`px-3 py-1 uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                              activeProjectTab === 'factoiq'
                                ? 'bg-[#FF6332] text-black font-bold shadow-sm'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            FactoIQ
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveProjectTab('factovision')}
                            className={`px-3 py-1 uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                              activeProjectTab === 'factovision'
                                ? 'bg-[#FF6332] text-black font-bold shadow-sm'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            FactoVision
                          </button>
                        </div>
                      </div>

                      {/* Products Container */}
                      <div className="space-y-6">
                        {exp.projects
                          .filter(
                            (proj) => activeProjectTab === 'all' || activeProjectTab === proj.id
                          )
                          .map((project) => (
                            <div
                              key={project.id}
                              className="relative bg-[#0E0E12] border border-neutral-800 hover:border-neutral-700/90 transition-all p-5 sm:p-7 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] group/card"
                            >
                              {/* Accent Top Border Indicator */}
                              <div
                                className={`absolute top-0 left-0 right-0 h-0.5 ${
                                  project.statusColor === 'emerald'
                                    ? 'bg-gradient-to-r from-emerald-500 via-[#FF6332] to-transparent'
                                    : 'bg-gradient-to-r from-cyan-400 via-[#FF6332] to-transparent'
                                }`}
                              />

                              {/* Project Header Bar */}
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 mb-4 border-b border-neutral-800/80">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5">
                                      {project.category}
                                    </span>
                                    <span
                                      className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 border ${
                                        project.statusColor === 'emerald'
                                          ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/70'
                                          : 'text-cyan-400 bg-cyan-950/60 border-cyan-800/70'
                                      }`}
                                    >
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                          project.statusColor === 'emerald' ? 'bg-emerald-400' : 'bg-cyan-400'
                                        }`}
                                      />
                                      {project.status}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2.5">
                                    <h4
                                      className="text-2xl sm:text-3xl font-display tracking-tight text-white uppercase"
                                      style={{ fontWeight: 400 }}
                                    >
                                      {project.name}
                                    </h4>

                                    {/* Direct Icon Link next to title */}
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 rounded-none text-neutral-400 hover:text-black hover:bg-[#FF6332] border border-neutral-800 hover:border-[#FF6332] transition-colors inline-flex items-center justify-center"
                                      title={`Open ${project.name} live platform (${project.link})`}
                                      aria-label={`Open ${project.name} in new tab`}
                                    >
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                      </svg>
                                    </a>
                                  </div>

                                  <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-0.5">
                                    {project.tagline}
                                  </p>
                                </div>

                                {/* Prominent Live Website Link Button with Icon */}
                                <div className="shrink-0">
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/link inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-[#FF6332] text-neutral-200 hover:text-black border border-neutral-700 hover:border-[#FF6332] transition-all duration-200 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#FF6332] cursor-pointer"
                                    title={`Explore ${project.name} (${project.link})`}
                                    aria-label={`Visit ${project.name} at ${project.link}`}
                                  >
                                    <span className="truncate max-w-[190px] sm:max-w-none">
                                      {project.link.replace('https://', '')}
                                    </span>
                                    <svg
                                      className="w-3.5 h-3.5 text-[#FF6332] group-hover/link:text-black group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform shrink-0"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                  </a>
                                </div>
                              </div>

                              {/* Engineering Specs Matrix */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5 p-3 sm:p-3.5 bg-black/60 border border-neutral-800/80">
                                {project.metrics.map((metric, mIdx) => (
                                  <div key={mIdx} className="flex flex-col">
                                    <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider font-semibold">
                                      {metric.label}
                                    </span>
                                    <span className="text-xs sm:text-[13px] font-mono text-neutral-200 font-medium mt-0.5 leading-snug break-words">
                                      {metric.val}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Core Architecture & Execution Highlights (from Resume) */}
                              <ul className="space-y-3 mb-5">
                                {project.bullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                                    <span className="text-[#FF6332] font-mono text-base shrink-0 select-none mt-[-2px]">
                                      ▸
                                    </span>
                                    <p className="text-neutral-300">
                                      <strong className="text-white font-semibold font-mono tracking-tight mr-1">
                                        {bullet.title}:
                                      </strong>
                                      {bullet.text}
                                    </p>
                                  </li>
                                ))}
                              </ul>

                              {/* Tech Stack Badges */}
                              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-neutral-800/60">
                                <span className="text-[10px] font-mono uppercase text-neutral-500 mr-1">
                                  Stack:
                                </span>
                                {project.techStack.map((tech, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="text-[10px] sm:text-[11px] font-mono bg-neutral-900/90 text-neutral-300 border border-neutral-800 px-2 py-0.5"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Company Level Skill Tags */}
                  <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-neutral-800/70">
                    {exp.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-[11px] font-mono bg-neutral-900 text-neutral-300 border border-neutral-800 px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-[11px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800 px-2.5 py-1">
                      {exp.extraTags}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
