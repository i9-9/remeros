'use client';

import { useState } from 'react'
import Image from 'next/image'

export default function Unidades() {
  const [currentImage, setCurrentImage] = useState(0)
  
  const images = [
    '/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 07_LIVING_FI (1).jpg',
    '/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 02_PEATONAL_FI (2).jpg',
    '/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 01_AEREA_FI (2).jpg',
    // Add more images as needed
  ]

  return (
    <section id="unidades" className="bg-primary-cream py-20">
      <div className="layout-margin">
        <div className="container-grid">
          {/* Header */}
          <div className="col-12 mb-16">
            <h2 className="font-gt-extended font-bold text-6xl md:text-7xl text-primary-dark mb-6">
              UNIDADES
            </h2>
            <div className="w-2 h-20 bg-primary-dark mb-8"></div>
            <p className="font-montreal-medium text-xl text-primary-dark max-w-2xl">
              Nuestras unidades están diseñadas para combinar la tranquilidad de la naturaleza con las ventajas de la vida en la ciudad.
            </p>
          </div>

          {/* Main Image */}
          <div className="col-12 mb-8">
            <div className="relative h-[70vh] rounded-lg overflow-hidden">
              <Image
                src="/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 07_LIVING_FI (1).jpg"
                alt="Interior de unidad - Living"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Gallery Navigation Dots */}
          <div className="col-12 flex justify-center">
            <div className="flex space-x-3">
              {[...Array(8)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-4 h-4 rounded-full transition-colors ${
                    index === currentImage 
                      ? 'bg-primary-dark' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 