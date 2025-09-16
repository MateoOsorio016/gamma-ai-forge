import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export const Loading: React.FC<LoadingProps> = ({ 
  className, 
  size = 'md', 
  variant = 'spinner' 
}) => {
  if (variant === 'spinner') {
    return (
      <Loader2 className={cn(sizeClasses[size], 'animate-spin', className)} />
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex space-x-1', className)}>
        <div className="h-2 w-2 bg-accent rounded-full animate-pulse"></div>
        <div className="h-2 w-2 bg-accent rounded-full animate-pulse delay-75"></div>
        <div className="h-2 w-2 bg-accent rounded-full animate-pulse delay-150"></div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('bg-muted rounded animate-pulse', className)} />
    );
  }

  return null;
};