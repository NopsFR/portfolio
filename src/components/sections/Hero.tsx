'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { personalInfo } from '@/data/portfolio';
import { useMousePosition } from '@/hooks/useMousePosition';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaUserSecret } from 'react-icons/fa';

// Animation variants for cleaner code
const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

export function Hero() {
  const mousePosition = useMousePosition();
  
  // Typing animation texts
  const typedTexts = [
    '> init cybersecurity_specialist.exe',
    '> loading full_stack_dev.dll',
    '> running bug_hunter.sh',
    '> executing problem_solver.py',
  ];
  
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typedTexts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentText.length) {
          setTypedText(currentText.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typedTexts.length);
        }
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex]);

  const parallaxX = mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const parallaxY = mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Animated background orbs with glass-like blur */}
      <motion.div
        className="absolute top-10 sm:top-20 left-0 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-green-500/15 to-emerald-500/5 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-0 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-500/5 blur-3xl"
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <Container className="relative z-10">
        <div className="text-center">
          {/* Profile Image with glass effect */}
          <motion.div
            className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-8"
            initial={scaleIn.initial}
            animate={scaleIn.animate}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 via-emerald-400 to-cyan-400 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Animated ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-green-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-green-500/10 blur-2xl" />
            {/* Hacker badge */}
            <motion.div
              className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-green-500/15 backdrop-blur-sm border border-green-500/30 flex items-center justify-center"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaUserSecret className="text-green-400" size={18} />
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 px-2 tracking-tight"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {personalInfo.name}
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            className="h-12 sm:h-14 md:h-16 mb-6 flex items-center justify-center font-mono text-sm sm:text-base md:text-lg"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-green-400">{typedText}</span>
            <span className="w-2.5 h-6 sm:h-8 md:h-10 bg-green-500 ml-1 animate-pulse rounded-sm" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed px-4"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Download Resume Button with glass effect */}
          <motion.div
            className="flex items-center justify-center mb-12"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium rounded-xl 
                         bg-green-500/10 backdrop-blur-sm border border-green-500/30 text-green-400
                         hover:bg-green-500/20 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10
                         transition-all duration-300"
            >
              <FaDownload className="group-hover:animate-bounce" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links with glass effect */}
          <motion.div
            className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {[
              { href: personalInfo.social.github, icon: FaGithub, label: 'GitHub', delay: 0.8 },
              { href: personalInfo.social.linkedin, icon: FaLinkedin, label: 'LinkedIn', delay: 0.9 },
              { href: `mailto:${personalInfo.email}`, icon: FaEnvelope, label: 'Email', delay: 1.0 },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl 
                           bg-white/5 backdrop-blur-sm border border-white/10 
                           flex items-center justify-center text-gray-400 
                           hover:text-green-400 hover:border-green-500/40 hover:bg-green-500/10 
                           transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: social.delay }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <motion.div
              className="w-6 h-10 rounded-full border border-green-500/30 flex items-start justify-center p-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

