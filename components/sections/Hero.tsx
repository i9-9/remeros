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
      <div className="relative z-0 h-screen">
        {/* Mobile: bloque centrado fuera de la grilla */}
        <div className="relative h-full w-full block md:hidden">
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-0 text-center flex flex-col items-center" 
            style={{
              paddingTop: '4rem', 
              paddingBottom: '4rem', 
              paddingLeft: '2rem', 
              paddingRight: '2rem',
              maxWidth: '100vw',
              boxSizing: 'border-box'
            }}
          >
          <h1 className="font-gt-extended font-light text-5xl text-primary-navy leading-none mb-12 relative text-center z-0">
            <span className="block p-8 absolute inset-0 -z-10 rounded-xl bg-white/60 backdrop-blur"></span>
            UNA NUEVA<br />
            MANERA DE<br />
            <span className="text-primary-navy font-bold">VIVIR TIGRE.</span>
          </h1>
          <button className="inline-flex items-center px-4 py-2 border border-primary-navy text-primary-navy font-montreal-medium text-lg hover:bg-white hover:text-primary-dark transition-all duration-300 rounded-full bg-white/60 backdrop-blur mt-8 z-0 relative">
            QUIERO SABER MÁS
            <svg className="ml-2 w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          </div>
        </div>
        {/* Desktop: bloque en grilla, abajo a la izquierda */}
        <div className="hidden md:block h-full layout-margin">
          <div className="container-grid w-full h-full">
            <div className="col-8 mb-18 flex flex-col justify-end h-full pt-40">
              <h1 className="font-gt-extended font-light text-7xl lg:text-4xl xl:text-5xl text-primary-navy leading-none mb-2 text-left">
                UNA NUEVA<br />
                MANERA DE<br />
                <span className="text-primary-navy font-bold">VIVIR TIGRE.</span>
              </h1>
              <button className="inline-flex items-center px-4 py-2 border border-primary-navy text-primary-navy font-montreal-medium text-lg hover:bg-white hover:text-primary-dark transition-all duration-300 rounded-full bg-white/60 backdrop-blur mt-8 mb-48 w-auto max-w-fit">
                QUIERO SABER MÁS
                <svg className="ml-2 w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}