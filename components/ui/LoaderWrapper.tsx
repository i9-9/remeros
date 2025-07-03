'use client';

import React, { useState, useEffect } from 'react';
import Loader from './Loader';

interface LoaderWrapperProps {
  children: React.ReactNode;
}

export default function LoaderWrapper({ children }: LoaderWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time and wait for page to be ready
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay for smooth transition
      setTimeout(() => {
        setShowLoader(false);
      }, 300);
    }, 1500); // Show loader for at least 1.5 seconds

    // Also listen for page load completion
    const handleLoad = () => {
      if (!isLoading) return;
      setIsLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 300);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, [isLoading]);

  return (
    <>
      {showLoader && (
        <Loader 
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      <div 
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  );
} 