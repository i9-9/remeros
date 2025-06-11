'use client';

import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';

export default function Hero() {
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 01_AEREA_FI (2).jpg"
          alt="Palmera de los Remeros - Vista aérea"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 "></div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-end h-[calc(80vh)] layout-margin">
        <div className="container-grid w-full">
          <div className="col-8 mb-24">
            <h1 className="font-gt-extended font-normal text-5xl md:text-7xl lg:text-6xl xl:text-5xl text-primary-navy leading-none mb-12">
              UNA NUEVA<br />
              MANERA DE<br />
              <span className="text-primary-navy font-bold">VIVIR TIGRE.</span>
            </h1>
            
            <button className="inline-flex items-center px-4 py-2 border border-primary-navy text-primary-navy font-montreal-medium text-lg hover:bg-white hover:text-primary-dark transition-all duration-300 rounded-full">
              QUIERO SABER MÁS
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
} 