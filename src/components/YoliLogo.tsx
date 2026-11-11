import React from 'react';

interface YoliLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const YoliLogo: React.FC<YoliLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl'
  };

  return (
    <span className={`font-brand font-bold text-[#ED64A6] tracking-tight lowercase leading-none select-none ${sizeClasses[size]} ${className}`}>
      yoli
    </span>
  );
};
