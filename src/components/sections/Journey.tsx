'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, Badge } from '@/components/ui/Card';
import { experiences } from '@/data/portfolio';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import {
  FaGraduationCap,
  FaCode,
  FaCertificate,
  FaAward,
  FaTerminal,
} from 'react-icons/fa';

const categoryIcons = {
  work: FaCode,
  certification: FaCertificate,
};

const categoryColors = {
  work: 'green',
  certification: 'cyan',
} as const;

export function Journey() {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section id="journey" className="py-20 px-4 relative">
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
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
              Journey
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            My continuous path of growth through cybersecurity, development, and
            certifications
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-cyan-500 to-emerald-500" />

          {/* Timeline items */}
          <div className="space-y-8">
            {experiences.map((item, index) => {
              const Icon = categoryIcons[item.type];
              const color = categoryColors[item.type];
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 ${
                      color === 'green'
                        ? 'bg-green-500 shadow-lg shadow-green-500/50'
                        : 'bg-cyan-500 shadow-lg shadow-cyan-500/50'
                    }`}
                  />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isLeft ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <Card glow={color === 'green' ? 'cyan' : 'none'}>
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                            color === 'green'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span
                              className={`text-sm font-medium font-mono ${
                                color === 'green'
                                  ? 'text-green-400'
                                  : 'text-cyan-400'
                              }`}
                            >
                              {item.period}
                            </span>
                            <Badge variant={color as 'green' | 'cyan'} size="sm">
                              {item.type === 'work' ? 'Work' : 'Certification'}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2">
                            {item.company}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Certifications &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-500">
              Achievements
            </span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {experiences
              .filter((exp) => exp.type === 'certification')
              .map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card glow="cyan">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <FaAward size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {cert.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-2">
                          {cert.company} • {cert.period}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}