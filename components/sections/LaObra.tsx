'use client';

import React, { useState, useEffect } from 'react';
import VideoPlayer from '@/components/ui/VideoPlayer';
import AnimatedTitle from '@/components/ui/AnimatedTitle';

export default function LaObra() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="la-obra" className="py-10 bg-primary-light">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
            <AnimatedTitle 
              className="font-gt-extended font-bold text-6xl md:text-5xl text-primary-cream whitespace-nowrap"
              delay={0.2}
              direction="up"
            >
              LA OBRA
            </AnimatedTitle>
            <AnimatedTitle
              className="w-1 h-16 bg-primary-cream mx-6 rotate-90 md:rotate-0"
              delay={0.4}
              direction="up"
            >
              <div className="w-1 h-16 bg-primary-cream"></div>
            </AnimatedTitle>
            <div className="flex flex-col items-center md:items-start">
              <AnimatedTitle 
                className="font-montreal-medium text-2xl text-primary-cream mb-2"
                delay={0.6}
                direction="up"
              >
                Mirá el avance de los trabajos en terreno
              </AnimatedTitle>
              <AnimatedTitle 
                className="font-montreal-light text-md text-primary-cream"
                delay={0.8}
                direction="up"
              >
                Palmera de los Remeros ya está en camino.
              </AnimatedTitle>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="max-w-5xl mx-auto">
          <VideoPlayer 
            videoUrl={isMobile ? "/videos/vid_mobile.mp4" : "/videos/vid_desktop.mp4"}
            thumbnailUrl="/images/2025-02-20 Instalación DRI A_C.jpg"
            className="h-[400px] md:h-[500px] lg:h-[600px]"
            isVertical={isMobile}
          />
        </div>

        {/* Progress Timeline */}
        

        {/* Construction Timeline */}
        

      </div>
    </section>
  );
} 