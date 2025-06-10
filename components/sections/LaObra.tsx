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
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-sage rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="heading-md text-primary-navy">Cimientos</h3>
            <p className="body-md text-primary-blue">
              Estructuras de fundación completadas con tecnología de punta
            </p>
            <div className="w-full bg-primary-cream rounded-full h-2">
              <div className="bg-primary-sage h-2 rounded-full" style={{width: '100%'}}></div>
            </div>
            <span className="text-sm font-gt-america text-primary-sage font-medium">COMPLETADO</span>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h3 className="heading-md text-primary-navy">Estructura</h3>
            <p className="body-md text-primary-blue">
              Avance de estructura vertical en ambas torres
            </p>
            <div className="w-full bg-primary-cream rounded-full h-2">
              <div className="bg-primary-gold h-2 rounded-full" style={{width: '65%'}}></div>
            </div>
            <span className="text-sm font-gt-america text-primary-gold font-medium">EN PROGRESO - 65%</span>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5" />
              </svg>
            </div>
            <h3 className="heading-md text-primary-navy">Terminaciones</h3>
            <p className="body-md text-primary-blue">
              Próxima etapa: acabados interiores y amenities
            </p>
            <div className="w-full bg-primary-cream rounded-full h-2">
              <div className="bg-primary-blue h-2 rounded-full" style={{width: '15%'}}></div>
            </div>
            <span className="text-sm font-gt-america text-primary-blue font-medium">PLANIFICADO</span>
          </div>
        </div>

        {/* Construction Timeline */}
        <div className="mt-20">
          <h3 className="heading-md text-primary-navy text-center mb-12">Cronograma de Obra</h3>
          
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-cream"></div>
            
            <div className="space-y-12">
              <div className="relative flex items-center">
                <div className="w-1/2 text-right pr-8">
                  <h4 className="font-gt-extended font-bold text-lg text-primary-navy">Q2 2024</h4>
                  <p className="text-primary-blue">Inicio de construcción</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-sage rounded-full border-4 border-primary-white"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-gold rounded-full border-4 border-primary-white"></div>
                <div className="w-1/2 pl-8">
                  <h4 className="font-gt-extended font-bold text-lg text-primary-navy">Q1 2025</h4>
                  <p className="text-primary-blue">Estructura completada</p>
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="w-1/2 text-right pr-8">
                  <h4 className="font-gt-extended font-bold text-lg text-primary-navy">Q3 2025</h4>
                  <p className="text-primary-blue">Terminaciones interiores</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-blue rounded-full border-4 border-primary-white"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-navy rounded-full border-4 border-primary-white"></div>
                <div className="w-1/2 pl-8">
                  <h4 className="font-gt-extended font-bold text-lg text-primary-navy">Q4 2025</h4>
                  <p className="text-primary-blue">Entrega de unidades</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center space-y-6">
          <p className="body-lg text-primary-blue">
            Seguí de cerca cada etapa del desarrollo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Recibir Actualizaciones</button>
            <button className="btn-secondary bg-transparent border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-primary-white">
              Galería de Avances
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 