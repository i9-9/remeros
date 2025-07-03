'use client';

import { useRef } from 'react';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import AnimatedTextReveal from '@/components/ui/AnimatedTextReveal';
import { getAssetPath } from '@/lib/utils';

export default function Proyecto() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const amenityLines = [
    "PILETA / SUM / PARRILLAS / GYM /",
    "COWORK / KIDS ROOM/ FOGONEROS /",
    "ESPACIO WELLNESS & SPA"
  ];

  return (
    <section id="proyecto" className="bg-primary-navy text-white py-20 w-full" ref={sectionRef}>
      <div className="layout-margin">
        <div className="container-grid">
          <div className="col-12 text-center mb-16 flex flex-wrap justify-center gap-x-4">
            <AnimatedTitle 
              className="font-gt-extended-medium text-6xl md:text-6xl lg:text-[9.5rem] md:leading-[1] text-center mb-0 z-10 relative inline-block"
              delay={0.2}
              direction="up"
            >
              <span className="block">
                <AnimatedTextReveal 
                  text="CONOCÉ" 
                  delay={0.2}
                  duration={0.08}
                />
              </span>
            </AnimatedTitle>
            <AnimatedTitle 
              className="font-gt-extended-medium text-6xl md:text-6xl lg:text-[9.5rem] md:leading-[1] text-center mb-0 z-10 relative inline-block"
              delay={0.4}
              direction="up"
            >
              <span className="block">
                <AnimatedTextReveal 
                  text="EL" 
                  delay={1.0}
                  duration={0.12}
                />
              </span>
            </AnimatedTitle>
            <AnimatedTitle 
              className="font-gt-extended-medium text-6xl md:text-6xl lg:text-[9.5rem] md:leading-[1] text-center mb-0 z-10 relative inline-block"
              delay={0.6}
              direction="up"
            >
              <span className="block">
                <AnimatedTextReveal 
                  text="PROYECTO" 
                  delay={1.5}
                  duration={0.08}
                />
              </span>
            </AnimatedTitle>
          </div>
          {/* Project Image */}
          <div className="col-12 mb-16">
            <div className="relative max-w-4xl mx-auto -mt-24 md:-mt-36 z-0">
              <img
                src={getAssetPath("/images/proyecto2.png")}
                alt="Palmera de los Remeros - Vista aérea del proyecto"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          {/* Stats Section */}
          <div className="col-12 mb-16">
            <div className="border-t border-b border-white py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <AnimatedCounter
                    to={140}
                    duration={2.5}
                    delay={0.2}
                    className="font-gt-expanded-regular text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[3rem] mb-2"
                  />
                  <div className="font-gt-expanded-regular text-xs md:text-sm tracking-wider">
                    UNIDADES<br />
                    FUNCIONALES
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[3rem] mb-2">
                    2,3,4 & 5
                  </div>
                  <div className="font-gt-expanded-regular text-xs md:text-sm tracking-wider">
                    AMBIENTES
                  </div>
                </div>
                <div className="text-center">
                  <AnimatedCounter
                    to={16000}
                    duration={3}
                    delay={0.4}
                    className="font-gt-expanded-regular text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[3rem] mb-2"
                  />
                  <div className="font-gt-expanded-regular text-xs md:text-sm tracking-wider">
                    M2 DE CONSTRUCCIÓN
                  </div>
                </div>
                <div className="text-center">
                  <AnimatedCounter
                    to={1100}
                    duration={2.8}
                    delay={0.6}
                    className="font-gt-expanded-regular text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[3rem] mb-2"
                  />
                  <div className="font-gt-expanded-regular text-xs md:text-sm tracking-wider">
                    M2 DE ZÓCALO<br />
                    COMERCIAL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Amenities Marquee List */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-primary-navy">
        {amenityLines.map((line, index) => (
          <div key={index} className="marquee-container py-4">
            <div className={index % 2 === 0 ? 'marquee-content' : 'marquee-content-reverse'}>
              <span className="font-gt-extended-thin text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
                {line}
              </span>
              <span className="font-gt-extended-thin text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
                {line}
              </span>
              <span className="font-gt-extended-thin text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
                {line}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}