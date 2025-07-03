'use client';

import React from 'react';
import Logo from './Logo';

interface LoaderProps {
  className?: string;
}

export default function Loader({ className = '' }: LoaderProps) {
  return (
    <div className={`fixed inset-0 bg-primary-beige flex items-center justify-center z-50 ${className}`}>
      <div className="flex flex-col items-center">
        {/* Logo with subtle growing animation */}
        <div className="animate-pulse-grow">
          <Logo 
            variant="remeros" 
            width={160} 
            height={78}
            className="text-primary-navy"
          />
        </div>
      </div>
    </div>
  );
} 