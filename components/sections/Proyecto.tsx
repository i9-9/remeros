'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Proyecto() {
  const [isVisible, setIsVisible] = useState(false);

  const amenityLines = [
    "PILETA/ SUM/ PARRILLAS/ GYM/",
    "COWORK/ KIDS ROOM/ FOGONEROS/",
    "ESPACIO WELLNESS & SPA"
  ];

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="proyecto" className="bg-primary-navy text-white py-20 min-h-[200vh] w-full">
      <div className="layout-margin">
        <div className="container-grid">
          <div className="col-12 text-center mb-16">
            <h2 className="font-gt-extended font-medium text-6xl md:text-6xl lg:text-[9.5rem] md:leading-[1] text-center mb-0 z-10 relative">
              <span className={`block transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 blur-0 translate-y-0' 
                  : 'opacity-0 blur-sm translate-y-8'
              }`}>
                CONOCÉ EL
              </span>
              <span className={`block md:-mt-5 transition-all duration-1000 ease-out delay-300 ${
                isVisible 
                  ? 'opacity-100 blur-0 translate-y-0' 
                  : 'opacity-0 blur-sm translate-y-8'
              }`}>
                PROYECTO
              </span>
            </h2> 
          </div>
          {/* Project Image */}
          <div className="col-12 mb-16">
            <div className="relative max-w-4xl mx-auto -mt-24 md:-mt-36 z-0">
              <Image
                src="/images/proyecto.png"
                alt="Palmera de los Remeros - Vista aérea del proyecto"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          {/* Stats Section */}
          <div className="col-12 mb-16">
            <div className="border-t border-b border-white py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2">140</div>
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    UNIDADES<br />
                    FUNCIONALES
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2">2,3,4&5</div>
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    AMBIENTES
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2">16.000</div>
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    M2 DE CONSTRUCCIÓN
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2">1.100</div>
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    M2 DE ZÓCALO<br />
                    COMERCIAL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Amenities Marquee List - full width, outside layout-margin */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-primary-navy">
        {amenityLines.map((line, index) => (
          <div
            key={index}
            className="w-full overflow-hidden whitespace-nowrap py-2"
          >
            <div
              className={
                `inline-block font-gt-extended-thin text-8xl md:text-6xl lg:text-8xl leading-none animate-marquee-infinite`
              }
              style={{
                animationDirection: index % 2 === 1 ? 'reverse' : 'normal'
              }}
            >
              {/* Duplicamos el texto para el bucle perfecto */}
              <span className="mr-20">{line}</span>
              <span className="mr-20">{line}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}