'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { FaGlobe, FaNetworkWired, FaShieldAlt } from 'react-icons/fa';

const learningPaths = [
  {
    icon: FaGlobe,
    title: "Web Fundamentals",
    color: "green",
    description: "Understanding how the web works is crucial for any security professional. This covers HTTP/HTTPS protocols, web architecture, client-server models, cookies, sessions, and the fundamentals of web application security.",
    topics: [
      "HTTP/HTTPS Protocols",
      "Web Architecture",
      "Client-Server Models",
      "Cookies & Sessions",
      "DNS & Domain Names",
      "Web Servers & Proxies",
    ],
  },
  {
    icon: FaNetworkWired,
    title: "Networks",
    color: "cyan",
    description: "Network security is the backbone of cybersecurity. Learn about network protocols, topologies, firewalls, VPNs, and how data travels across the internet. Essential for understanding how attackers move through networks.",
    topics: [
      "TCP/IP & OSI Models",
      "Network Topologies",
      "Firewalls & VPNs",
      "Port Scanning",
      "Network Segmentation",
      "Wireless Security",
    ],
  },
  {
    icon: FaShieldAlt,
    title: "Cyber Defense",
    color: "emerald",
    description: "Defensive security focuses on protecting systems and networks from attacks. Learn about security monitoring, incident response, threat intelligence, and building robust defense strategies to protect organizational assets.",
    topics: [
      "Security Monitoring",
      "Incident Response",
      "Threat Intelligence",
      "SIEM Tools",
      "Vulnerability Management",
      "Security Policies",
    ],
  },
];

const colorClasses = {
  green: {
    bg: "from-green-500/10 to-green-500/5",
    border: "border-green-500/30",
    text: "text-green-400",
    iconBg: "bg-green-500/20",
    iconText: "text-green-400",
  },
  cyan: {
    bg: "from-cyan-500/10 to-cyan-500/5",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    iconBg: "bg-cyan-500/20",
    iconText: "text-cyan-400",
  },
  emerald: {
    bg: "from-emerald-500/10 to-emerald-500/5",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
    iconText: "text-emerald-400",
  },
};

export function LearningPaths() {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <section id="learning-paths" className="py-20 px-4 relative">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
              Paths
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Core cybersecurity domains I've mastered through hands-on practice
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {learningPaths.map((path, index) => {
            const colors = colorClasses[path.color as keyof typeof colorClasses];
            const Icon = path.icon;
            
            return (
              <motion.div
                key={path.title}
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
                    {path.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {path.description}
                  </p>

                  {/* Topics */}
                  <ul className="space-y-2">
                    {path.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.iconBg}`} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}