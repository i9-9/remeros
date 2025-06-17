import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  delay?: number;
}

export default function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2, 
  className = "",
  suffix = "",
  delay = 0 
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    // Si el número contiene puntos o comas, mantener el formato
    if (to.toString().includes('.') || to.toString().includes(',')) {
      return to.toLocaleString('es-AR');
    }
    return Math.round(latest).toLocaleString('es-AR');
  });
  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const timer = setTimeout(() => {
        const controls = animate(count, to, { 
          duration,
          ease: "easeOut"
        });

        return controls.stop;
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [inView, count, to, duration, delay]);

  return (
    <motion.div ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>{suffix}
    </motion.div>
  );
}