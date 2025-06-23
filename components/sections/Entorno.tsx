'use client'

import React, { useEffect, useState } from 'react';
import AnimatedTitle from '@/components/ui/AnimatedTitle'

export default function Entorno() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="entorno"
      className={`relative w-full h-[50vh] min-h-[300px] flex items-end bg-no-repeat ${!isMobile ? 'bg-fixed' : 'bg-scroll'}`}
      style={{
        backgroundImage: "url('/images/Remeros drone-45.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay suave */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none h-full" />
      <div className="relative w-full h-full flex flex-col justify-end px-16 pb-12" style={{height: '50vh'}}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6 md:gap-0">
          {/* Título a la izquierda restaurado */}
          <AnimatedTitle className="" delay={0.2} direction="up">
            <h2 className="text-white font-gt-extended font-medium text-3xl md:text-5xl leading-none">
              UN ENTORNO<br />
              <span className='font-bold'>INIGUALABLE</span>
            </h2>
          </AnimatedTitle>
          {/* Subtítulo a la derecha */}
          <p className="text-white text-left font-montreal-medium text-xl leading-[1.2rem] md:text-2xl max-w-xl lg:leading-[1.4rem]">
            Un lugar que combina lo mejor de lo natural y lo urbano
          </p>
        </div>
      </div>
    </section>
  );
}