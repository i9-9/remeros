'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface AnimatedTitleProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function AnimatedTitle({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: AnimatedTitleProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.6,
    rootMargin: '-50px 0px'
  })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, opacity: 0 }
      case 'down':
        return { y: -50, opacity: 0 }
      case 'left':
        return { x: 50, opacity: 0 }
      case 'right':
        return { x: -50, opacity: 0 }
      default:
        return { y: 50, opacity: 0 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={inView ? getFinalPosition() : getInitialPosition()}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 