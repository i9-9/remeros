'use client';

import { motion } from 'framer-motion';
import { useOptimizedInView } from '@/lib/hooks/useOptimizedInView';

interface AnimatedDividerProps {
  className?: string;
  delay?: number;
  duration?: number;
  backgroundColor?: string;
  size?: 'normal' | 'large';
}

export default function AnimatedDivider({ 
  className = "",
  delay = 0,
  duration = 0.8,
  backgroundColor = 'bg-primary-dark',
  size = 'normal'
}: AnimatedDividerProps) {
  const { ref, inView } = useOptimizedInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const sizeClasses = size === 'large' 
    ? 'w-20 h-1 md:w-1 md:h-20'
    : 'w-16 h-1 md:w-1 md:h-16';

  return (
    <div ref={ref} className={className}>
      <motion.div
        className={`${backgroundColor} ${sizeClasses} origin-left md:origin-bottom`}
        initial={{ scaleX: 0, scaleY: 0 }}
        animate={inView ? { 
          scaleX: 1, 
          scaleY: 1 
        } : { 
          scaleX: 0, 
          scaleY: 0 
        }}
        transition={{
          delay,
          duration,
          ease: "easeOut"
        }}
      />
    </div>
  );
} 