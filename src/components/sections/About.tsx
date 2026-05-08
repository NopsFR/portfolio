'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { aboutData } from '@/data/portfolio';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { FaCode, FaShieldAlt, FaCloud, FaTerminal } from 'react-icons/fa';

const highlights = [
  { icon: FaCode, label: 'Development', value: aboutData.highlights[0] },
  { icon: FaShieldAlt, label: 'Cybersecurity', value: aboutData.highlights[1] },
  { icon: FaCloud, label: 'Cloud', value: aboutData.highlights[2] },
  { icon: FaTerminal, label: 'IT', value: aboutData.highlights[3] },
];

// Split description into paragraphs
const paragraphs = aboutData.description.split('\n\n').filter((p) => p.trim());

export function About() {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 px-4 relative">
      <Container>
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Me
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Passionate about building secure, scalable, and beautiful digital experiences
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-[2px]">
                <div className="w-full h-full rounded-2xl bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <span className="text-6xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400">
                      O
                    </span>
                    <p className="text-gray-400 mt-4 text-sm sm:text-base">
                      Cybersecurity Engineer
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-lg bg-pink-500/20 border border-pink-500/30 text-pink-400 text-sm font-medium"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                24/7 Learning
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Security First
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Developer & Security Enthusiast
            </h3>
            <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Card hover={false} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                        <highlight.icon className="text-pink-400" size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium text-sm truncate">
                          {highlight.value}
                        </p>
                        <p className="text-gray-500 text-xs">{highlight.label}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}