'use client';

import React from 'react';
import VideoPlayer from '@/components/ui/VideoPlayer';

export default function LaObra() {
  return (
    <section id="la-obra" className="section-padding bg-primary-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-primary-navy mb-6">LA OBRA</h2>
          <p className="body-lg text-primary-blue max-w-3xl mx-auto">
            Mirá el avance de los trabajos en terreno. Palmera de los Remeros ya está en camino.
          </p>
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