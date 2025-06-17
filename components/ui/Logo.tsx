import Image from 'next/image'

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'remeros' | 'portland' | 'remeros-footer';
}

export default function Logo({ className = '', size = 'md', type = 'remeros' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-32',
  };

  const logoSrc = {
    remeros: '/logo/logo_remeros.svg',
    portland: '/logo/logo_portland.svg',
    'remeros-footer': '/logo/logo_remeros_footer.svg'
  };

  return (
    <Image
      src={logoSrc[type]}
      alt={type === 'portland' ? 'Grupo Portland' : 'Palmera de los Remeros'}
      width={type === 'portland' ? 120 : 200}
      height={type === 'portland' ? 60 : 98}
      className={`${sizeClasses[size]} w-auto ${className}`}
      priority={type === 'remeros'}
    />
  );
} 