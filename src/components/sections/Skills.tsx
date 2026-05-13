'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, SkillBar, Badge } from '@/components/ui/Card';
import { skills } from '@/data/portfolio';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import {
  FaShieldAlt,
  FaCode,
  FaTools,
  FaTerminal,
} from 'react-icons/fa';

// Filter skills by category
const getSkillsByCategory = (category: 'security' | 'languages' | 'frameworks' | 'tools') => 
  skills.filter(skill => skill.category === category);

const skillCategories = [
  {
    id: 'security',
    label: 'Cybersecurity',
    icon: FaShieldAlt,
    skills: getSkillsByCategory('security'),
    color: 'green',
  },
  {
    id: 'languages',
    label: 'Languages & Frameworks',
    icon: FaCode,
    skills: [...getSkillsByCategory('languages'), ...getSkillsByCategory('frameworks')],
    color: 'cyan',
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    icon: FaTerminal,
    skills: getSkillsByCategory('tools'),
    color: 'emerald',
  },
];

const colorMap = {
  green: {
    bg: 'from-green-500/20 to-green-500/5',
    border: 'border-green-500/30',
    text: 'text-green-400',
    badge: 'bg-green-500/20 text-green-300',
    gradient: 'from-green-500 to-cyan-500',
  },
  cyan: {
    bg: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/20 text-cyan-300',
    gradient: 'from-cyan-500 to-emerald-500',
  },
  emerald: {
    bg: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300',
    gradient: 'from-emerald-500 to-green-500',
  },
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('security');
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  const currentCategory = skillCategories.find((c) => c.id === activeCategory);
  const colors = colorMap[currentCategory?.color as keyof typeof colorMap];
  const categoryColor = currentCategory?.color as 'green' | 'cyan' | 'emerald' | undefined;

  // Filter skills to only show those >= 50% and pad to maintain 6 grid
  const filteredSkills = currentCategory?.skills
    .filter(skill => skill.level >= 50)
    .sort((a, b) => b.level - a.level) || [];

  // Pad to nearest multiple of 6 for consistent grid layout
  const paddedSkills = [...filteredSkills];
  const remainder = paddedSkills.length % 6;
  if (remainder !== 0) {
    for (let i = 0; i < 6 - remainder; i++) {
      paddedSkills.push({ name: '', level: 0, category: currentCategory?.id as any });
    }
  }

  return (
    <section id="skills" className="py-20 px-4 relative">
      <Container>
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Skills &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
              Expertise
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-4">
            A comprehensive overview of my technical abilities across
            cybersecurity, development, and tools
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm mt-4 px-4">
            Skills developed through <span className="text-green-400">TryHackMe labs</span>, <span className="text-cyan-400">real-world projects</span>, and <span className="text-emerald-400">professional experience</span>
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${colors.bg} border ${colors.border} ${colors.text}`
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon size={16} />
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid - 6 column layout with filtered skills (>=50%) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {paddedSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                {skill.name ? (
                  <Card hover={false} className="h-full">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium text-xs sm:text-sm truncate" title={skill.name}>
                        {skill.name}
                      </h3>
                      <Badge variant={categoryColor === 'emerald' ? 'default' : categoryColor || 'default'} size="sm">
                        {skill.level}%
                      </Badge>
                    </div>
                    <SkillBar
                      name=""
                      level={skill.level}
                      delay={index * 0.03}
                    />
                  </Card>
                ) : (
                  <div className="h-full opacity-0" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Additional Skills Tags - More Prominent Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-r from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-center text-white font-semibold text-lg md:text-xl mb-2">
              Also Familiar With
            </h3>
            <p className="text-center text-gray-500 text-sm mb-6">
              Additional technologies and tools I have experience with
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                'Git',
                'Docker',
                'Linux',
                'Windows',
                'Networking',
                'REST APIs',
                'GraphQL',
                'PostgreSQL',
                'MongoDB',
                'Redis',
                'Nginx',
                'Bash',
                'PowerShell',
                'OWASP',
                'SIEM',
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-gray-300 text-sm sm:text-base hover:text-green-400 hover:border-green-500/50 hover:from-green-500/20 hover:to-green-500/5 transition-all duration-300 cursor-default font-mono shadow-lg"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}