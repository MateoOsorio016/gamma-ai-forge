import React from 'react';
import { cn } from '@/lib/utils';
import gammaLogo from '@/assets/gamma-logo.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  showText = true, 
  size = 'md' 
}) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <img
        src={gammaLogo}
        alt="Gamma AI"
        className={cn(sizeClasses[size], 'object-contain')}
      />
      {showText && (
        <span className={cn(
          'font-bold text-primary tracking-tight',
          textSizeClasses[size]
        )}>
          Gamma
        </span>
      )}
    </div>
  );
};