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
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full px-4 text-center block md:hidden z-10 mb-24">
          <div className="w-full max-w-md flex flex-col items-center gap-4">
            <h1 className="font-gt-extended font-light text-4xl leading-tight text-primary-navy bg-white/20 backdrop-blur rounded-xl p-6 w-full">
              UNA NUEVA<br />
              MANERA DE<br />
              <span className="text-primary-navy font-bold">VIVIR TIGRE.</span>
            </h1>
            <button className="inline-flex items-center justify-center px-4 py-2  text-primary-navy font-montreal-medium text-lg hover:bg-white hover:text-primary-dark transition-all duration-300 rounded-full bg-white/60 backdrop-blur w-full">
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
              <h1 className="font-gt-extended font-light text-4xl lg:text-4xl xl:text-5xl text-primary-navy leading-none mb-2 text-left">
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