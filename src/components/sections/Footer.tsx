'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { personalInfo } from '@/data/portfolio';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from 'react-icons/fa';

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
            <motion.a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={18} />
            </motion.a>
            <motion.a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin size={18} />
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope size={18} />
            </motion.a>
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