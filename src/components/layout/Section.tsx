'use client';

import { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'none' | 'gradient' | 'glass';
}

const paddingSizes = {
  none: '',
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-20',
  xl: 'py-24',
  '2xl': 'py-32',
};

export function Section({
  children,
  id,
  className = '',
  padding = 'lg',
  background = 'none',
}: SectionProps) {
  const backgroundClasses = {
    none: '',
    gradient: 'relative',
    glass: 'relative',
  };

  return (
    <section
      id={id}
      className={`relative ${paddingSizes[padding]} ${backgroundClasses[background]} ${className}`}
    >
      <Container className={`flex flex-col items-center ${className}`}>{children}</Container>
    </section>
  );
}