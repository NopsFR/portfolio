'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { FaShieldAlt, FaUserNinja, FaBalanceScale } from 'react-icons/fa';

const hackerTypes = [
  {
    icon: FaShieldAlt,
    title: "White Hat",
    color: "green",
    description: "The ethical hackers who use their skills for good. They work with organizations to find and fix vulnerabilities before malicious actors can exploit them. White hats operate legally, with permission, and follow strict ethical guidelines.",
    traits: ["Ethical", "Authorized", "Defensive", "Certified"],
  },
  {
    icon: FaUserNinja,
    title: "Black Hat",
    color: "red",
    description: "Malicious hackers who break into systems for personal gain, theft, or destruction. They exploit vulnerabilities illegally, often for financial profit, espionage, or to cause damage to individuals and organizations.",
    traits: ["Malicious", "Illegal", "Offensive", "Criminal"],
  },
  {
    icon: FaBalanceScale,
    title: "Grey Hat",
    color: "cyan",
    description: "Hackers who operate in a moral middle ground. They may break into systems without permission but without malicious intent, often to expose vulnerabilities publicly. They walk the line between ethical and unethical behavior.",
    traits: ["Ambiguous", "Unsanctioned", "Revealing", "Complex"],
  },
];

const colorClasses = {
  green: {
    bg: "from-green-500/10 to-green-500/5",
    border: "border-green-500/30",
    text: "text-green-400",
    iconBg: "bg-green-500/20",
    iconText: "text-green-400",
    badgeBg: "bg-green-500/10",
    badgeBorder: "border-green-500/30",
    badgeText: "text-green-300",
  },
  red: {
    bg: "from-red-500/10 to-red-500/5",
    border: "border-red-500/30",
    text: "text-red-400",
    iconBg: "bg-red-500/20",
    iconText: "text-red-400",
    badgeBg: "bg-red-500/10",
    badgeBorder: "border-red-500/30",
    badgeText: "text-red-300",
  },
  cyan: {
    bg: "from-cyan-500/10 to-cyan-500/5",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    iconBg: "bg-cyan-500/20",
    iconText: "text-cyan-400",
    badgeBg: "bg-cyan-500/10",
    badgeBorder: "border-cyan-500/30",
    badgeText: "text-cyan-300",
  },
};

export function HackerTypes() {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section id="hacker-types" className="py-20 px-4 relative">
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
            Types of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
              Hackers
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Understanding the different hats in cybersecurity
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {hackerTypes.map((type, index) => {
            const colors = colorClasses[type.color as keyof typeof colorClasses];
            const Icon = type.icon;
            
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover={false} className={`h-full bg-gradient-to-br ${colors.bg} border ${colors.border} p-6`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${colors.iconBg} flex items-center justify-center mb-6`}>
                    <Icon className={`${colors.iconText}`} size={32} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold ${colors.text} mb-4`}>
                    {type.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {type.description}
                  </p>

                  {/* Traits */}
                  <div className="flex flex-wrap gap-2">
                    {type.traits.map((trait) => (
                      <span
                        key={trait}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${colors.badgeBg} border ${colors.badgeBorder} ${colors.badgeText}`}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}