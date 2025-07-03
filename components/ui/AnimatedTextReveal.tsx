'use client';

import { motion } from 'framer-motion';
import { useOptimizedInView } from '@/lib/hooks/useOptimizedInView';

interface AnimatedTextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedTextReveal({ 
  text, 
  delay = 0, 
  duration = 0.05,
  className = "" 
}: AnimatedTextRevealProps) {
  const { ref, inView } = useOptimizedInView({
    threshold: 0.6,
    triggerOnce: true,
    rootMargin: '-200px 0px'
  });

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ 
            opacity: 0, 
            y: 20,
            filter: 'blur(8px)'
          }}
          animate={inView ? { 
            opacity: 1, 
            y: 0,
            filter: 'blur(0px)'
          } : { 
            opacity: 0, 
            y: 20,
            filter: 'blur(8px)'
          }}
          transition={{
            duration: 0.6,
            delay: delay + (index * duration),
            ease: "easeOut"
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
} 