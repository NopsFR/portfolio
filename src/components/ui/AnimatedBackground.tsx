'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 300 + 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const backgroundX = useTransform(springX, [-1, 1], ['-2%', '2%']);
  const backgroundY = useTransform(springY, [-1, 1], ['-2%', '2%']);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Animated gradient orbs - Pink Hacking Theme */}
      <motion.div
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Large pink gradient - main */}
        <div
          className="absolute rounded-full blur-[120px] opacity-20"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255, 45, 123, 0.4) 0%, transparent 70%)',
            top: '10%',
            left: '20%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />

        {/* Secondary pink gradient */}
        <div
          className="absolute rounded-full blur-[120px] opacity-15"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255, 77, 141, 0.4) 0%, transparent 70%)',
            top: '50%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />

        {/* Cyan accent gradient - for contrast */}
        <div
          className="absolute rounded-full blur-[120px] opacity-8"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, transparent 70%)',
            bottom: '10%',
            left: '30%',
            animation: 'float 18s ease-in-out infinite',
          }}
        />

        {/* Tertiary pink gradient */}
        <div
          className="absolute rounded-full blur-[100px] opacity-12"
          style={{
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(255, 107, 157, 0.4) 0%, transparent 70%)',
            top: '30%',
            right: '25%',
            animation: 'float 22s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* Floating particles - Pink Hacking Theme */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${
              particle.id % 3 === 0
                ? 'rgba(255, 45, 123, 0.12)'
                : particle.id % 3 === 1
                ? 'rgba(255, 77, 141, 0.1)'
                : 'rgba(0, 240, 255, 0.06)'
            } 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Mouse-following glow effect component
export function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none -z-5 transition-opacity duration-300"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="rounded-full blur-[80px]"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 45, 123, 0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}