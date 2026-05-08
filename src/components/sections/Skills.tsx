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

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {currentCategory?.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card hover={false} className="h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium text-sm sm:text-base">
                      {skill.name}
                    </h3>
                  <Badge variant={currentCategory.color as 'green' | 'cyan' | 'default'} size="sm">
                      {skill.level}%
                    </Badge>
                  </div>
                  <SkillBar
                    name=""
                    level={skill.level}
                    delay={index * 0.05}
                  />
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-center text-gray-400 mb-6 text-sm sm:text-base">
            Also familiar with
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
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
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs sm:text-sm hover:text-green-400 hover:border-green-500/30 hover:bg-green-500/10 transition-all duration-300 cursor-default font-mono"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}