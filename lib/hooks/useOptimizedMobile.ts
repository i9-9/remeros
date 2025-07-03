import { useState, useCallback } from 'react';
import { useThrottledResize } from './useDebounce';

export function useOptimizedMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint);
  }, [breakpoint]);

  // Use throttled resize instead of immediate resize
  useThrottledResize(checkMobile, 200);

  return isMobile;
} 