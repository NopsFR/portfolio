'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'pink' | 'purple' | 'cyan' | 'none';
  delay?: number;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  hover = true,
  glow = 'none',
  delay = 0,
  onClick,
}: CardProps) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const glowStyles = {
    pink: 'hover:shadow-pink-500/20 hover:border-pink-500/30',
    purple: 'hover:shadow-purple-500/20 hover:border-purple-500/30',
    cyan: 'hover:shadow-cyan-500/20 hover:border-cyan-500/30',
    none: '',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`
        relative overflow-hidden
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-2xl p-6
        transition-all duration-300
        hover:border-white/20 hover:bg-white/[0.07]
        ${glowStyles[glow]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Skill bar component for displaying skill levels
interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-sm text-pink-400">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isIntersecting ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full relative"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}

// Badge component
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pink' | 'purple' | 'cyan' | 'green' | 'default';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  const variants = {
    pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    green: 'bg-green-500/20 text-green-300 border-green-500/30',
    default: 'bg-white/10 text-gray-300 border-white/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        border rounded-full font-medium
        ${variants[variant]}
        ${sizes[size]}
      `}
    >
      {children}
    </span>
  );
}