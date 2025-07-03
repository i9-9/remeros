import React from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

interface LogoProps {
  variant?: 'remeros' | 'portland' | 'remeros-footer';
  className?: string;
  width?: number;
  height?: number;
}

const logoMap = {
  portland: getAssetPath('/logo/logo_portland.svg'),
  remeros: getAssetPath('/logo/logo_remeros.svg'),
  'remeros-footer': getAssetPath('/logo/logo_remeros_footer.svg')
};

export default function Logo({ 
  variant = 'remeros',
  className = '',
  width = 200,
  height = 98 
}: LogoProps) {
  const src = logoMap[variant];
  
  return (
    <Image
      src={src}
      alt={variant === 'portland' ? 'Grupo Portland' : 'Palmera de los Remeros'}
      width={width}
      height={height}
      className={className}
    />
  );
} 