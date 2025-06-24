'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import { useInView } from 'react-intersection-observer';

interface ParallaxState {
  scrollY: number;
  isSupported: boolean;
  useFixed: boolean;
}

export default function Entorno() {
  // Refs and state for parallax
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallaxState, setParallaxState] = useState<ParallaxState>({
    scrollY: 0,
    isSupported: true,
    useFixed: false
  });
  
  // Intersection observer to optimize performance
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    rootMargin: '50px 0px'
  });

  // Detect device capabilities and preferences
  useEffect(() => {
    const checkDeviceSupport = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isDesktop = window.innerWidth >= 1024;
      
      setParallaxState(prev => ({
        ...prev,
        isSupported: !isMobileDevice && !prefersReducedMotion,
        useFixed: isDesktop && !prefersReducedMotion // Use fixed background on desktop
      }));
    };

    checkDeviceSupport();
    window.addEventListener('resize', checkDeviceSupport);
    
    return () => window.removeEventListener('resize', checkDeviceSupport);
  }, []);

  // Optimized scroll handler with RAF
  const handleScroll = useCallback(() => {
    if (!inView || !parallaxState.isSupported || parallaxState.useFixed || !sectionRef.current) return;

    requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      if (!sectionRect) return;
      
      const sectionTop = sectionRect.top + scrolled;
      const relativeScroll = scrolled - sectionTop;
      
      setParallaxState(prev => ({
        ...prev,
        scrollY: relativeScroll * 0.5 // Adjust speed factor here
      }));
    });
  }, [inView, parallaxState.isSupported, parallaxState.useFixed]);

  // Scroll event listener with cleanup
  useEffect(() => {
    if (!parallaxState.isSupported || parallaxState.useFixed) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, parallaxState.isSupported, parallaxState.useFixed]);

  // Set multiple refs
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  return (
    <section
      ref={setRefs}
      id="entorno"
      className={`relative w-full h-[50vh] min-h-[300px] flex items-end overflow-hidden`}
      style={{ isolation: 'isolate' }}
    >
      {/* Background with parallax effect */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center will-change-transform backface-hidden
          ${parallaxState.useFixed ? 'bg-fixed' : ''}`}
        style={{
          backgroundImage: "url('/images/parallax.jpg')",
          transform: (!parallaxState.useFixed && parallaxState.isSupported)
            ? `translate3d(0, ${parallaxState.scrollY}px, 0)`
            : 'none',
          transition: (!parallaxState.useFixed && !parallaxState.isSupported) ? 'transform 0.1s ease-out' : 'none',
          willChange: (!parallaxState.useFixed && parallaxState.isSupported) ? 'transform' : 'auto',
          transformStyle: parallaxState.useFixed ? 'flat' : 'preserve-3d',
          backgroundAttachment: parallaxState.useFixed ? 'fixed' : 'scroll'
        }}
      />

      {/* Overlay with gradient for better text contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative w-full flex flex-col justify-end px-6 md:px-16 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6 md:gap-0">
          <AnimatedTitle 
            className="relative" 
            delay={0.2} 
            direction="up"
          >
            <h2 className="text-white font-gt-extended font-medium text-3xl md:text-5xl leading-none">
              UN ENTORNO<br />
              <span className='font-bold'>INIGUALABLE</span>
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