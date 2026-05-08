'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { tryHackMeStats } from '@/data/portfolio';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import {
  FaTrophy,
  FaFire,
  FaBook,
  FaStar,
  FaShieldAlt,
  FaBug,
  FaNetworkWired,
  FaGlobe,
  FaTerminal,
  FaPython,
  FaAward,
} from 'react-icons/fa';
import { SiTryhackme } from 'react-icons/si';

const iconMap: Record<string, React.ElementType> = {
  shield: FaShieldAlt,
  bug: FaBug,
  network: FaNetworkWired,
  web: FaGlobe,
  linux: FaTerminal,
  python: FaPython,
};

const stats = [
  {
    label: 'Rank',
    value: tryHackMeStats.rank,
    icon: FaStar,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
  },
  {
    label: 'Top Percent',
    value: tryHackMeStats.topPercent,
    icon: FaTrophy,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
  },
  {
    label: 'Rooms Completed',
    value: tryHackMeStats.completedRooms,
    icon: FaBook,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
  },
  {
    label: 'Total XP',
    value: tryHackMeStats.totalXp.toLocaleString(),
    icon: FaFire,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
  },
];

export function TryHackMe() {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section id="tryhackme" className="py-20 px-4 relative">
      <Container>
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <SiTryhackme className="text-red-500" size={36} />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              TryHackMe{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Progress
              </span>
            </h2>
          </div>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Hands-on cybersecurity learning through practical labs and
            real-world scenarios
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="text-center" glow="pink">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                <SiTryhackme className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {tryHackMeStats.username}
              </h3>
              <p className="text-gray-400">
                XP: {tryHackMeStats.totalXp.toLocaleString()}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={stat.color} size={18} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-white text-center mb-6">
            Earned Badges
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tryHackMeStats.badges.map((badge, index) => {
              const IconComponent = iconMap[badge.icon] || FaAward;
              return (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card hover={false} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                      <IconComponent className="text-red-400" size={20} />
                    </div>
                    <span className="text-white font-medium">{badge.name}</span>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <h3 className="text-xl font-semibold text-white text-center mb-6">
            Certificates
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {tryHackMeStats.certificates.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card glow="cyan" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <FaAward className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <span className="text-white font-medium">{cert}</span>
                    <p className="text-gray-500 text-xs">TryHackMe Certificate</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            onClick={() => window.open(tryHackMeStats.profileUrl, '_blank')}
            leftIcon={<SiTryhackme />}
          >
            View Full Profile
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}