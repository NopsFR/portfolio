'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, Badge } from '@/components/ui/Card';
import { learningJourney, certifications } from '@/data/portfolio';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import {
  FaGraduationCap,
  FaCode,
  FaCertificate,
  FaAward,
} from 'react-icons/fa';

const categoryIcons = {
  cybersecurity: FaGraduationCap,
  development: FaCode,
  certification: FaCertificate,
};

const categoryColors = {
  cybersecurity: 'pink',
  development: 'purple',
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
            Learning{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Journey
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            My continuous path of growth through cybersecurity, development, and
            certifications
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500" />

          {/* Timeline items */}
          <div className="space-y-8">
            {learningJourney.map((item, index) => {
              const Icon = categoryIcons[item.category];
              const color = categoryColors[item.category];
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
                      color === 'pink'
                        ? 'bg-pink-500 shadow-lg shadow-pink-500/50'
                        : color === 'purple'
                        ? 'bg-purple-500 shadow-lg shadow-purple-500/50'
                        : 'bg-cyan-500 shadow-lg shadow-cyan-500/50'
                    }`}
                  />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isLeft ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <Card glow={color === 'pink' ? 'pink' : color === 'purple' ? 'purple' : 'none'}>
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                            color === 'pink'
                              ? 'bg-pink-500/20 text-pink-400'
                              : color === 'purple'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span
                              className={`text-sm font-medium ${
                                color === 'pink'
                                  ? 'text-pink-400'
                                  : color === 'purple'
                                  ? 'text-purple-400'
                                  : 'text-cyan-400'
                              }`}
                            >
                              {item.date}
                            </span>
                            <Badge variant={color} size="sm">
                              {item.category}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {item.description}
                          </p>
                          {item.progress !== undefined && (
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-pink-400">
                                  {item.progress}%
                                </span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Certifications &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
              Achievements
            </span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
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
                        {cert.name}
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">
                        {cert.issuer} • {cert.date}
                      </p>
                      {cert.credentialId && (
                        <Badge variant="cyan" size="sm">
                          ID: {cert.credentialId}
                        </Badge>
                      )}
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