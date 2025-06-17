'use client';

import React from 'react';
import VideoPlayer from '@/components/ui/VideoPlayer';
import AnimatedTitle from '@/components/ui/AnimatedTitle';

export default function LaObra() {
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
            <div className="w-1 h-16 bg-primary-cream mx-6 rotate-90 md:rotate-0"></div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-montreal-medium text-2xl text-primary-cream mb-2">
                Mirá el avance de los trabajos en terreno
              </h3>
              <p className="font-montreal-light text-md text-primary-cream">
                Palmera de los Remeros ya está en camino.
              </p>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="max-w-5xl mx-auto">
          <VideoPlayer 
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            thumbnailUrl="/images/2025-02-20 Instalación DRI A_C.jpg"
            className="h-[400px] md:h-[500px] lg:h-[600px]"
          />
        </div>

        {/* Progress Timeline */}
        

        {/* Construction Timeline */}
        

      </div>
    </section>
  );
} 