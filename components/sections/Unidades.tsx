'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import ImageGallery from '@/components/ui/ImageGallery'
import { getAssetPath } from '@/lib/utils';
import AnimatedDivider from '@/components/ui/AnimatedDivider';

export default function Unidades() {
  const galleryImages = [
    getAssetPath('/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 08_DORMITORIO_FI (1).jpg'),
    getAssetPath('/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 06_PILETA_FI (2).jpg'),
    getAssetPath('/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 05_SUM_ER01 (1).jpg'),
    getAssetPath('/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 04_RETAIL_FI (2).jpg'),
    getAssetPath('/images/gallery/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 03_ZOOM BALCON_FI (1).jpg'),
    getAssetPath('/images/gallery/Untitled.jpg')
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
                className="font-gt-extended font-bold text-5xl md:text-6xl lg:text-7xl text-primary-dark mb-0 whitespace-nowrap"
                delay={0.2}
                direction="up"
              >
                UNIDADES
              </AnimatedTitle>
              <AnimatedDivider
                className="block md:mx-8"
                delay={0.4}
                duration={0.8}
                backgroundColor="bg-primary-dark"
              />
              <div className="max-w-2xl">
                <AnimatedTitle 
                  className="font-montreal-medium text-xl text-primary-dark mb-0"
                  delay={0.6}
                  direction="up"
                >
                  Nuestras unidades están diseñadas para combinar la tranquilidad de la naturaleza con las ventajas de la vida en la ciudad.
                </AnimatedTitle>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div 
            ref={ref}
            className={`col-12 transition-opacity duration-1000 ease-out ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageGallery images={galleryImages} />
          </div>
        </div>
      </div>
    </section>
  )
} 