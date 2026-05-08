'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { socialLinks } from '@/data/portfolio';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from 'react-icons/fa';
import { FaHackerrank } from 'react-icons/fa6';

const iconMap = {
  FaGithub: FaGithub,
  FaHackerrank: FaHackerrank,
  FaLinkedin: FaLinkedin,
  FaTwitter: FaTwitter,
  FaEnvelope: FaEnvelope,
};

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-white/10">
      <Container>
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-pink-500/25 mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            O
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((link) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];
              if (!IconComponent) return null;

              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={18} />
                </motion.a>
              );
            })}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['Home', 'About', 'Skills', 'Projects', 'Journey', 'Contact'].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Admin Link */}
          <div className="mb-6">
            <a
              href="/admin/login"
              className="text-gray-500 hover:text-pink-400 text-xs transition-colors"
            >
              Admin Login
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">
              © {currentYear} Oscar. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Built with Next.js, TypeScript, Tailwind CSS & Framer Motion
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}