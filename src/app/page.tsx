'use client';

import { useState, useCallback } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TechArsenal from '@/components/TechArsenal';
import WorkExperience from '@/components/WorkExperience';
import FeaturedProjects from '@/components/FeaturedProjects';
import LifeSection from '@/components/LifeSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <SmoothScroll isLoading={isLoading}>
        <div className="min-h-screen bg-[#ECE8DF] text-[#111111] flex flex-col justify-between selection:bg-[#FF6332] selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Hero />
            <Services />
            <TechArsenal />
            <WorkExperience />
            <FeaturedProjects />
            <LifeSection />
            <CTASection />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
