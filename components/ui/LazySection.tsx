'use client';

import { ReactNode } from 'react';
import { useOptimizedInView } from '@/lib/hooks/useOptimizedInView';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function LazySection({ 
  children, 
  className = "",
  threshold = 0.1,
  rootMargin = "50px"
}: LazySectionProps) {
  const { ref, inView } = useOptimizedInView({
    threshold,
    triggerOnce: true,
    rootMargin
  });

  return (
    <div ref={ref} className={className}>
      {inView ? children : <div className="min-h-[400px]" />}
    </div>
  );
} 