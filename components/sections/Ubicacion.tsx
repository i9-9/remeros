'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Ubicacion() {

  const [imageError, setImageError] = useState(false);
  
  return (
    <section id="ubicacion" className="bg-primary-cream min-h-screen overflow-hidden pt-12">
      <div className="layout-margin">
        <div className="container-grid">
          {/* Header */}
          <div className="col-12 mb-8">
            <div className="w-full flex flex-row items-center justify-center gap-8">
              <h2 className="font-gt-extended font-bold text-6xl md:text-5xl text-primary-dark whitespace-nowrap">
                UBICACIÓN
              </h2>
              <div className="w-1 h-16 bg-primary-dark mx-6"></div>
              <div className="flex flex-col items-start">
                <h3 className="font-montreal-medium text-2xl text-primary-dark mb-2">
                  Camino de los Remeros y Ruta 27
                </h3>
                <p className="font-montreal-light text-md text-primary-dark">
                  Próximo a Remeros Plaza, a 5 minutos del Centro comercial Nordelta y del Acceso Tigre (Panamericana).
                </p>
              </div>
            </div>
          </div>

          {/* Main Content: Green Box + Map */}
          <div className="col-12 flex justify-center items-start gap-12 h-[600px]">
            <div className="flex flex-col self-start h-full">
              <div className="bg-primary-sage text-primary-cream h-full flex flex-col justify-between">
                <div className="py-4 px-6">
                  <div>
                    <h3 className="font-montreal-bold text-2xl mb-6 text-primary-cream">Gastronomía</h3>
                    <div className="space-y-1 text-xs font-montreal-light ">
                      <p>Kansas</p>
                      <p>La Valiente Focacceria</p>
                      <p>Rapa Nui Nordelta</p>
                      <p>La Pulperie</p>
                      <p>Cosqo Holy</p>
                      <p>Le Pain Quotidien</p>
                      <p>Obvio Carne y Pasta</p>
                      <p>Sushi Club</p>
                      <p>Los Inmortales</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-montreal-bold text-2xl mb-6">Servicios</h3>
                    <div className="space-y-1 text-xs">
                      <p>Carrefour</p>
                      <p>Sport Club Remeros</p>
                      <p>Uces Tigre</p>
                      <p>Centro Comercial</p>
                      <p>Nordelta Remeros</p>
                      <p>Plaza</p>
                      <p>Jumbo Nordelta</p>
                      <p>Universidad Siglo 21</p>
                      <p>Nordelta Golf Club</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col self-start h-full">
              <div className="relative w-[600px] h-full max-w-full rounded-lg overflow-hidden">
                {!imageError ? (
                  <Image
                    src="/images/mapa.png"
                    alt="Mapa de ubicación Palmera de los Remeros"
                    fill
                    className="object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <h3 className="font-montreal-medium text-lg text-primary-dark mb-2">Mapa de Ubicación</h3>
                      <p className="text-sm text-gray-600">Camino de los Remeros y Ruta 27</p>
                    </div>
                  </div>
                )}
                {/* Map overlay points (if we want to add them) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* We can add specific location markers here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 