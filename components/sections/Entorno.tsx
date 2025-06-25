'use client'

import React from 'react';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import { useInView } from 'react-intersection-observer';
import { useParallax } from 'react-scroll-parallax';

export default function Entorno() {
  const { ref: inViewRef } = useInView({
    threshold: 0,
    rootMargin: '50px 0px'
  });

  const parallax = useParallax<HTMLDivElement>({
    speed: -15,
    translateY: [-30, 30],
  });

  return (
    <section
      ref={inViewRef}
      id="entorno"
      className="relative w-full h-[50vh] min-h-[300px] overflow-hidden"
    >
      <div 
        ref={parallax.ref}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/parallax.jpg)',
          transform: 'scale(1.6)',
          top: '-30%',
          height: '160%'
        }}
      />
      
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
        }}
      />

      <div className="relative h-full flex flex-col justify-end px-6 md:px-16 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6 md:gap-0">
          <AnimatedTitle 
            className="relative" 
            delay={0.2} 
            direction="up"
          >
            <h2 className="text-white font-gt-extended-medium text-3xl md:text-5xl leading-none">
              UN ENTORNO<br />
              <span className='font-gt-extended-bold'>INIGUALABLE</span>
            </h2>
          </AnimatedTitle>
          
          <p className="text-white text-left font-montreal-medium text-xl leading-[1.2rem] md:text-2xl max-w-xl lg:leading-[1.4rem]">
            Un lugar que combina lo mejor de lo natural y lo urbano
          </p>
        </div>
      </div>
    </section>
  );
}