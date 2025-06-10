'use client'

import Image from 'next/image'

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="bg-primary-cream py-20">
      <div className="layout-margin">
        <div className="container-grid">
          {/* Header */}
          <div className="col-12 mb-16">
            <h2 className="font-gt-extended font-bold text-6xl md:text-7xl text-primary-dark mb-6">
              UBICACIÓN
            </h2>
            <div className="w-2 h-20 bg-primary-dark mb-6"></div>
            <div className="max-w-2xl">
              <h3 className="font-montreal-medium text-2xl text-primary-dark mb-4">
                Camino de los Remeros y Ruta 27
              </h3>
              <p className="font-montreal-light text-lg text-primary-dark">
                Próximo a Remeros Plaza, a 5 minutos del Centro comercial Nordelta y del Acceso Tigre (Panamericana).
              </p>
            </div>
          </div>

          {/* Left Panel - Green Background */}
          <div className="col-4">
            <div className="bg-[#8BA584] text-white p-8 rounded-lg h-[600px]">
              <div className="space-y-12">
                {/* Gastronomía */}
                <div>
                  <h3 className="font-montreal-bold text-2xl mb-6">Gastronomía</h3>
                  <p className="font-montreal-medium text-lg mb-4 text-white/80">Kansas</p>
                  <div className="space-y-3 text-sm">
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

                {/* Servicios */}
                <div>
                  <h3 className="font-montreal-bold text-2xl mb-6">Servicios</h3>
                  <div className="space-y-3 text-sm">
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

          {/* Right Panel - Map */}
          <div className="col-8">
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/images/mapa-ubicacion.jpg"
                alt="Mapa de ubicación Palmera de los Remeros"
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback si no existe la imagen del mapa
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div class="text-center">
                        <div class="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                        </div>
                        <h3 class="font-montreal-medium text-lg text-primary-dark mb-2">Mapa de Ubicación</h3>
                        <p class="text-sm text-gray-600">Camino de los Remeros y Ruta 27</p>
                      </div>
                    </div>
                  `;
                }}
              />
              
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
    </section>
  )
} 