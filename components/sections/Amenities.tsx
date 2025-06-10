'use client';

import React from 'react';
import { Download } from 'lucide-react';
import Image from 'next/image';

export default function Amenities() {
  const handleDownload = (type: 'brochure' | 'plantas') => {
    // Aquí se implementaría la descarga real de los PDFs
    console.log(`Downloading ${type}`);
    
    // Simulación de descarga
    const filename = type === 'brochure' ? 'Palmera-Remeros-Brochure.pdf' : 'Palmera-Remeros-Plantas.pdf';
    
    // En producción, esto sería una URL real del archivo
    const dummyUrl = `https://grupoportland.com/remeros/downloads/${filename}`;
    
    // Crear elemento de descarga temporal
    const link = document.createElement('a');
    link.href = dummyUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="amenities" className="relative">
      {/* Background Image */}
      <div className="relative h-screen">
        <Image
          src="/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 02_PEATONAL_FI (2).jpg"
          alt="Palmera de los Remeros - Vista peatonal"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Download Buttons with 50px margin */}
        <div className="absolute inset-0 flex items-end layout-margin pb-16">
          <div className="container-grid w-full">
            <div className="col-6 space-y-4">
              <button className="flex items-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors px-8 py-4 text-primary-dark font-montreal-medium text-lg rounded-full">
                DESCARGAR BROCHURE
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </button>
              
              <button className="flex items-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors px-8 py-4 text-primary-dark font-montreal-medium text-lg rounded-full">
                DESCARGAR PLANTAS
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section with green background and aerial view */}
      <section className="bg-primary-cream py-20">
        <div className="relative h-[80vh]">
          <Image
            src="/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 01_AEREA_FI (2).jpg"
            alt="Un entorno inigualable"
            fill
            className="object-cover"
          />
          
          {/* Text Overlay with 50px margin */}
          <div className="absolute inset-0 flex items-center layout-margin">
            <div className="container-grid w-full">
              <div className="col-8">
                <h2 className="font-gt-extended font-bold text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-8">
                  UN ENTORNO<br />
                  <span className="text-primary-cream">INIGUALABLE</span>
                </h2>
                
                <p className="font-montreal-medium text-xl md:text-2xl text-white">
                  Un lugar que combina lo mejor de lo<br />
                  natural y lo urbano
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
} 