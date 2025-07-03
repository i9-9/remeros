'use client';

import { motion } from 'framer-motion';
import { useOptimizedInView } from '@/lib/hooks/useOptimizedInView';

interface AnimatedWordRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedWordReveal({ 
  text, 
  delay = 0, 
  duration = 0.2,
  className = "" 
}: AnimatedWordRevealProps) {
  const { ref, inView } = useOptimizedInView({
    threshold: 0.6,
    triggerOnce: true,
    rootMargin: '-200px 0px'
  });

  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ 
            opacity: 0, 
            y: 10,
            filter: 'blur(4px)'
          }}
          animate={inView ? { 
            opacity: 1, 
            y: 0,
            filter: 'blur(0px)'
          } : { 
            opacity: 0, 
            y: 10,
            filter: 'blur(4px)'
          }}
          transition={{
            duration: 0.4,
            delay: delay + (index * duration),
            ease: "easeOut"
          }}
          style={{ display: 'inline-block', marginRight: '0.25rem' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
} 