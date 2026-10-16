'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  tabLabel: string;
  name: string;
  tagline: string;
  category: string;
  dateBadge: string;
  description: string;
  githubUrl: string;
  image: string;
  liveMetric: string;
  pipelineSummary: string;
  cardBg: string;
  tabBg: string;
  tabTextColor: string;
  headingColor: string;
  taglineColor: string;
  descColor: string;
  metaColor: string;
  btnStyle: string;
  tagStyle: string;
  tabMarginClass: string;
  isFirst: boolean;
  tags: string[];
}

const featuredProjects: ProjectItem[] = [
  {
    id: 'sanctuary-ai',
    tabLabel: 'PROJECT 01',
    name: 'SanctuaryAI',
    tagline: 'Your Safe Space — AI Wellness & Crisis Companion',
    category: 'AGENTIC AI · MENTAL HEALTH',
    dateBadge: '2025 · OPEN SOURCE',
    description:
      'An agent-powered empathetic mental-health companion with smart crisis detection & real-time emergency escalation. Built with a resilient backend using Python, FastAPI, and Uvicorn, paired with a real-time empathetic chat interface in Streamlit. Orchestrates specialist LLMs (Ollama, MedGemma, GPT-4o-mini) via LangChain & LangGraph, seamlessly integrated with Twilio & Geolocation API to enable automatic, location-aware emergency escalation.',
    githubUrl: 'https://github.com/dalvi2312/Sanctuary_ai',
    image: '/images/projects/sanctuary_ai.jpg',
    liveMetric: 'REAL-TIME CRISIS DETECTION',
    pipelineSummary: 'MedGemma + Twilio Escalation',
    cardBg: 'bg-[#E2EDD6]', // Refined light creamy green
    tabBg: 'bg-[#E2EDD6]',
    tabTextColor: 'text-neutral-900',
    headingColor: 'text-neutral-950',
    taglineColor: 'text-neutral-900',
    descColor: 'text-neutral-800',
    metaColor: 'text-neutral-800',
    btnStyle:
      'bg-black text-white hover:bg-[#FF6332] hover:text-black border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]',
    tagStyle: 'bg-black text-white shadow-[2px_2px_0px_rgba(0,0,0,0.4)]',
    tabMarginClass: 'ml-0',
    isFirst: true,
    tags: [
      'Python',
      'FastAPI',
      'Streamlit',
      'Ollama',
      'MedGemma',
      'GPT-4o-mini',
      'LangChain',
      'LangGraph',
      'Twilio',
      'Geolocation API',
      'Uvicorn',
    ],
  },
  {
    id: 'samachar-ai',
    tabLabel: 'PROJECT 02',
    name: 'SamacharAI',
    tagline: 'Unbiased News Journalist — News. Summarized.',
    category: 'AUTONOMOUS AGENT · MCP ARCHITECTURE',
    dateBadge: '2025 · OPEN SOURCE',
    description:
      "Engineered an autonomous AI journalist application that scrapes news & Reddit discussions using Bright Data's Model Context Protocol (MCP). The system processes and summarizes multi-source data with advanced LLMs, then converts it into broadcast-quality audio reports via ElevenLabs TTS. Built with Streamlit & FastAPI, the solution bypasses anti-bot mechanisms to deliver personalized, real-time news experiences, showcasing end-to-end AI integration.",
    githubUrl: 'https://github.com/dalvi2312/Samachar_ai',
    image: '/images/projects/samachar_ai.jpg',
    liveMetric: 'AUTONOMOUS MCP SCRAPING',
    pipelineSummary: 'Bright Data MCP + ElevenLabs TTS',
    cardBg: 'bg-[#111111]',
    tabBg: 'bg-[#111111]',
    tabTextColor: 'text-white',
    headingColor: 'text-white',
    taglineColor: 'text-white/95',
    descColor: 'text-white/90',
    metaColor: 'text-white/80',
    btnStyle:
      'bg-white text-black hover:bg-[#FF6332] hover:text-black border-2 border-white shadow-[3px_3px_0px_rgba(255,255,255,0.25)]',
    tagStyle: 'bg-white text-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]',
    tabMarginClass: 'ml-0 lg:ml-[220px]',
    isFirst: false,
    tags: [
      'Streamlit',
      'FastAPI',
      'Bright Data MCP',
      'LLMs',
      'ElevenLabs',
      'LangChain',
      'LangGraph',
      'Google News',
      'Reddit',
      'Model Context Protocol (MCP)',
    ],
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project header
      gsap.from('.projects-header', {
        scrollTrigger: {
          trigger: '.projects-header',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="w-full pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-neutral-900 bg-linen paper-texture relative z-10 scroll-mt-20 md:scroll-mt-24"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - Kept 100% intact */}
        <div className="projects-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16 pb-8 border-b border-black/15">
          <div>
            <div className="inline-block mb-5 sm:mb-6">
              <span className="bg-black text-white text-[10px] md:text-xs font-mono font-bold px-3 py-1 rounded-none uppercase tracking-widest shadow-[2px_2px_0px_#FF6332]">
                [ SELECTED WORK &amp; CASE STUDIES ]
              </span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[96px] font-display uppercase tracking-tight text-neutral-900 leading-none"
              style={{ fontWeight: 400 }}
            >
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="max-w-md text-neutral-700 text-xs md:text-sm leading-relaxed font-mono">
            Autonomous multi-agent systems, empathetic AI companions, and real-time intelligence pipelines.
          </p>
        </div>

        {/* 
          Sticky Overlapping Stacked Project Cards Container
          - Desktop (>=1024px): lg:sticky lg:top-24
          - Card 1 tab sits at left (ml-0), Card 2 tab sits at lg:ml-[220px]
          - When Card 2 docks over Card 1, BOTH tabs remain simultaneously visible side-by-side
          - Reduced bottom padding for a tight, elegant transition to LifeSection
          - Mobile/Tablet (<1024px): natural non-overlapping vertical flow
        */}
        <div className="relative flex flex-col gap-12 sm:gap-16 lg:gap-20 pb-8 sm:pb-12 lg:pb-20 max-w-6xl mx-auto">
          {featuredProjects.map((project, idx) => {
            const zIndex = (idx + 1) * 10;

            return (
              <article
                key={project.id}
                style={{
                  zIndex,
                }}
                className="project-stacked-card relative lg:sticky lg:top-24 w-full"
              >
                {/* Folder Tab on Top */}
                <div className="flex select-none">
                  <div
                    className={`relative ${project.tabMarginClass} inline-flex items-center gap-2 h-11 sm:h-12 px-5 sm:px-8 text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] ${project.tabTextColor} border-t-2 border-l-2 border-r-2 border-black ${project.tabBg} shadow-[2px_-2px_0px_rgba(0,0,0,1)]`}
                    style={{
                      clipPath: project.isFirst
                        ? 'polygon(0 0, calc(100% - 28px) 0, 100% 100%, 0 100%)'
                        : 'polygon(28px 0, calc(100% - 28px) 0, 100% 100%, 0 100%)',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M12 2c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9Z" />
                    </svg>
                    <span className={project.isFirst ? '' : 'pl-2 sm:pl-3'}>{project.tabLabel}</span>
                  </div>
                </div>

                {/* Main Card Body */}
                <div
                  className={`relative border-2 border-black ${project.cardBg} p-6 sm:p-8 md:p-12 lg:min-h-[580px] shadow-[6px_6px_0px_#111111] overflow-hidden`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Project Details */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        {/* Category & Status Bar (Single clean line with single circle bullet) */}
                        <div
                          className={`flex items-center gap-2 sm:gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider pb-3 border-b overflow-hidden ${
                            project.isFirst ? 'border-black/20 text-neutral-800' : 'border-white/20 text-white'
                          }`}
                        >
                          <span
                            className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ${
                              project.isFirst ? 'bg-black' : 'bg-white'
                            }`}
                          />
                          <span className="whitespace-nowrap shrink-0">{project.dateBadge}</span>
                          <span className={`shrink-0 ${project.isFirst ? 'text-black/30' : 'text-white/40'}`}>|</span>
                          <span className={`text-[11px] sm:text-xs tracking-wider uppercase whitespace-nowrap truncate ${project.metaColor}`}>
                            {project.category}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3
                          className={`text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight ${project.headingColor} leading-none pt-1`}
                          style={{ fontWeight: 400 }}
                        >
                          {project.name}
                        </h3>

                        {/* Subtitle / Tagline */}
                        <p className={`text-base sm:text-lg font-semibold ${project.taglineColor} leading-snug`}>
                          {project.tagline}
                        </p>

                        {/* Resume Description */}
                        <p className={`text-xs sm:text-sm ${project.descColor} leading-relaxed font-mono`}>
                          {project.description}
                        </p>

                        {/* Single Prominent GitHub Action Button */}
                        <div className="pt-3">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2.5 px-5 py-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer group/gh ${project.btnStyle}`}
                            title={`View ${project.name} on GitHub`}
                            aria-label={`View ${project.name} source code on GitHub`}
                          >
                            <svg
                              className="w-4 h-4 fill-current shrink-0"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              />
                            </svg>
                            <span>VIEW ON GITHUB</span>
                            <span className="text-[#FF6332] font-bold group-hover/gh:text-inherit">↗</span>
                          </a>
                        </div>
                      </div>

                      {/* Angled Cut Tech Tags (Portfoliofy Inspired) */}
                      <div
                        className={`flex flex-wrap gap-2 pt-6 sm:pt-8 mt-5 border-t ${
                          project.isFirst ? 'border-black/20' : 'border-white/20'
                        }`}
                      >
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`font-mono px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide ${project.tagStyle}`}
                            style={{
                              clipPath: 'polygon(0 28%, 12% 0, 100% 0, 100% 100%, 0 100%)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Project Image with Masking Tape */}
                    <div className="lg:col-span-6 relative">
                      {/* Diagonal Masking Tape Strips */}
                      <span
                        aria-hidden="true"
                        className="absolute -top-3.5 -left-4 sm:-top-4 sm:-left-5 z-20 w-16 sm:w-22 h-6 -rotate-12 pointer-events-none bg-white/80 shadow-[0_1px_3px_rgba(17,18,18,0.25)] backdrop-blur-[1px]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute -top-3.5 -right-4 sm:-top-4 sm:-right-5 z-20 w-16 sm:w-22 h-6 rotate-12 pointer-events-none bg-white/80 shadow-[0_1px_3px_rgba(17,18,18,0.25)] backdrop-blur-[1px]"
                      />

                      {/* Framed Image Card */}
                      <div className="relative border-2 sm:border-3 border-black bg-black shadow-[5px_5px_0px_#111111] overflow-hidden group/img">
                        <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                          <img
                            alt={`${project.name} Cover Preview`}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover block group-hover/img:scale-[1.03] transition-transform duration-500"
                            src={project.image}
                          />
                        </div>

                        {/* Live Terminal Badge */}
                        <div className="bg-neutral-900 border-t border-neutral-800 p-2.5 sm:p-3 flex items-center justify-between font-mono text-[10px] sm:text-xs text-neutral-300">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="font-semibold text-white">{project.liveMetric}</span>
                          </div>
                          <span className="text-neutral-400 truncate max-w-[180px] sm:max-w-none">
                            {project.pipelineSummary}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
