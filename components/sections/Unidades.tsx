'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import ImageGallery from '@/components/ui/ImageGallery'

export default function Unidades() {
  const images = [
    '/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 08_DORMITORIO_FI (1).jpg',
    '/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 06_PILETA_FI (2).jpg',
    '/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 05_SUM_ER01 (1).jpg',
    '/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 04_RETAIL_FI (2).jpg',
    '/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 03_ZOOM BALCON_FI (1).jpg',
    '/images/gallery/Untitled.jpg',
    '/images/gallery/Untitled-1.jpg',
    '/images/gallery/Untitled-2.jpg',
  ]

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
              <AnimatedTitle
                className="block md:mx-8"
                delay={0.4}
                direction="up"
              >
                <div className="h-1 w-16 md:h-16 md:w-1 bg-primary-dark"></div>
              </AnimatedTitle>
              <AnimatedTitle 
                className="max-w-2xl"
                delay={0.6}
                direction="up"
              >
                <p className="font-montreal-medium text-xl text-primary-dark mb-0">
                  Nuestras unidades están diseñadas para combinar la tranquilidad de la naturaleza con las ventajas de la vida en la ciudad.
                </p>
              </AnimatedTitle>
            </div>
          </div>

          {/* Gallery */}
          <div 
            ref={ref}
            className={`col-12 transition-opacity duration-1000 ease-out ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageGallery images={images} />
          </div>
        </div>
      </div>
    </section>
  )
} 