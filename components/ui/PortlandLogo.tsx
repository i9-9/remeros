import React from 'react';
import Image from 'next/image';

interface PortlandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 32,
  md: 60,
  lg: 73,
};

export default function PortlandLogo({ className = '', size = 'md' }: PortlandLogoProps) {
  const height = sizeMap[size] || 60;
  
  return (
    <Image
      src="/logo/logo_portland.svg"
      alt="Grupo Portland"
      width={height * 3.74}
      height={height}
      className={className}
    />
  );
} 