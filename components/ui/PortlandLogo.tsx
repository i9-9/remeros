import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

interface PortlandLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function PortlandLogo({ 
  className = "", 
  width = 273,
  height = 73 
}: PortlandLogoProps) {
  return (
    <Image
      src={getAssetPath("/logo/logo_portland.svg")}
      alt="Grupo Portland"
      width={width}
      height={height}
      className={`text-primary-beige ${className}`}
    />
  );
} 