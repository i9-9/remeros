'use client';

import { useInView } from 'react-intersection-observer';
import { useMemo } from 'react';

interface UseOptimizedInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useOptimizedInView(options: UseOptimizedInViewOptions = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px'
  } = options;

  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  return { ref, inView };
}

// Hook optimizado para animaciones de texto
export function useTextAnimationInView(delay: number = 0) {
  const { ref, inView } = useOptimizedInView({
    threshold: 0.2,
    rootMargin: '100px'
  });

  const animationProps = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }), [inView, delay]);

  return { ref, inView, animationProps };
}

// Hook para secciones que necesitan menos precisión
export function useLazyInView() {
  return useOptimizedInView({
    threshold: 0.05,
    rootMargin: '200px'
  });
} 