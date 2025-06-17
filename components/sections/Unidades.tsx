'use client';

import { useState } from 'react'
import Image from 'next/image'
import AnimatedTitle from '@/components/ui/AnimatedTitle'

export default function Unidades() {
  const [currentImage, setCurrentImage] = useState(0)
  
  // Remove or comment out the unused variable 'images'
  // const images = [
  //   '/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 07_LIVING_FI (1).jpg',
  //   '/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 02_PEATONAL_FI (2).jpg',
  //   '/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 01_AEREA_FI (2).jpg',
  //   // Add more images as needed
  // ]

  return (
    <section id="unidades" className="bg-primary-cream py-20">
      <div className="layout-margin">
        <div className="container-grid">
          {/* Header */}
          <div className="col-12 mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4 md:gap-12 w-full">
              <AnimatedTitle 
                className="font-gt-extended font-bold text-6xl md:text-7xl text-primary-dark mb-0 whitespace-nowrap"
                delay={0.2}
                direction="up"
              >
                UNIDADES
              </AnimatedTitle>
              <div className="hidden md:block w-1 h-16 bg-primary-dark mx-8"></div>
              <AnimatedTitle 
                className="max-w-2xl"
                delay={0.4}
                direction="up"
              >
                <p className="font-montreal-medium text-xl text-primary-dark mb-0">
                  Nuestras unidades están diseñadas para combinar la tranquilidad de la naturaleza con las ventajas de la vida en la ciudad.
                </p>
              </AnimatedTitle>
            </div>
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