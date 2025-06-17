'use client';

import { useEffect, useRef } from 'react';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function Proyecto() {
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const amenityLines = [
    "PILETA/ SUM/ PARRILLAS/ GYM/",
    "COWORK/ KIDS ROOM/ FOGONEROS/",
    "ESPACIO WELLNESS & SPA"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Actualizar la posición de cada marquee
      marqueeRefs.current.forEach((ref, index) => {
        if (ref) {
          // Velocidad diferente para cada línea
          const speed = (index + 1) * 0.8;
          // Dirección alternada según el índice
          const direction = index % 2 === 0 ? 1 : -1;
          const translateX = (currentScrollY * speed * direction) % window.innerWidth;
          
          ref.style.transform = `translateX(${translateX}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="proyecto" className="bg-primary-navy text-white py-20 w-full">
      <div className="layout-margin">
        <div className="container-grid">
          <div className="col-12 text-center mb-16">
            <AnimatedTitle 
              className="font-gt-extended font-medium text-6xl md:text-6xl lg:text-[9.5rem] md:leading-[1] text-center mb-0 z-10 relative"
              delay={0.2}
              direction="up"
            >
              <span className="block">CONOCÉ EL</span>
              <span className="block md:-mt-5">PROYECTO</span>
            </AnimatedTitle>
          </div>
          {/* Project Image */}
          <div className="col-12 mb-16">
            <div className="relative max-w-4xl mx-auto -mt-24 md:-mt-36 z-0">
              <img
                src="/images/proyecto.png"
                alt="Palmera de los Remeros - Vista aérea del proyecto"
                className="w-full h-auto rounded-lg"
                onLoad={() => console.log('✅ Imagen proyecto cargada exitosamente')}
                onError={(e) => console.error('❌ Error cargando imagen proyecto:', e)}
                style={{ border: '2px solid red' }}
              />
            </div>
          </div>
          {/* Stats Section */}
          <div className="col-12 mb-16">
            <div className="border-t border-b border-white py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <AnimatedCounter
                    to={140}
                    duration={2.5}
                    delay={0.2}
                    className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2"
                  />
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    UNIDADES<br />
                    FUNCIONALES
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2">
                    2,3,4&5
                  </div>
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    AMBIENTES
                  </div>
                </div>
                <div className="text-center">
                  <AnimatedCounter
                    to={16000}
                    duration={3}
                    delay={0.4}
                    className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2"
                  />
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    M2 DE CONSTRUCCIÓN
                  </div>
                </div>
                <div className="text-center">
                  <AnimatedCounter
                    to={1100}
                    duration={2.8}
                    delay={0.6}
                    className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2"
                  />
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
      {/* Amenities Marquee List - controlado por scroll */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-primary-navy">
        {amenityLines.map((line, index) => (
          <div
            key={index}
            className="w-full overflow-hidden whitespace-nowrap py-2"
          >
            <div
              ref={(el) => {
                if (marqueeRefs.current) {
                  marqueeRefs.current[index] = el;
                }
              }}
              className="inline-block font-gt-extended-thin text-8xl md:text-6xl lg:text-8xl leading-none will-change-transform"
            >
              {/* Múltiples repeticiones para cubrir el ancho completo */}
              {[...Array(10)].map((_, i) => (
                <span key={i} className="mr-20">{line}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}