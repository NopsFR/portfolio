'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FaShieldAlt, 
  FaLock, 
  FaBug, 
  FaUserSecret, 
  FaGlobe, 
  FaEye, 
  FaFireExtinguisher,
  FaBook,
  FaLightbulb,
  FaTools,
  FaGraduationCap,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCode,
  FaNetworkWired,
  FaDatabase,
  FaMobileAlt
} from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const concepts = [
  {
    icon: FaShieldAlt,
    title: "What is Cybersecurity?",
    description: "Cybersecurity is the practice of protecting systems, networks, programs, devices and data from digital attacks. It's about keeping your information safe from unauthorized access, theft, or damage.",
    color: "cyan"
  },
  {
    icon: FaLock,
    title: "Confidentiality",
    description: "Ensuring that information is accessible only to those authorized to have access. Think of it like a locked diary - only you have the key to read what's inside.",
    color: "blue"
  },
  {
    icon: FaCheckCircle,
    title: "Integrity",
    description: "Maintaining the accuracy and completeness of data. It means your information hasn't been tampered with or modified by unauthorized people.",
    color: "green"
  },
  {
    icon: FaFireExtinguisher,
    title: "Availability",
    description: "Ensuring that authorized users have access to information when needed. Like making sure your favorite website is always up and running when you want to visit it.",
    color: "orange"
  }
];

const threats = [
  {
    icon: FaUserSecret,
    title: "Phishing",
    description: "Tricking people into revealing sensitive information through fake emails or websites that look legitimate.",
    example: "An email pretending to be from your bank asking you to 'verify' your password",
    defense: "Always check the sender's email address, hover over links before clicking, and never share passwords via email"
  },
  {
    icon: FaBug,
    title: "Malware",
    description: "Malicious software designed to harm or exploit computers, including viruses, worms, trojans, and ransomware.",
    example: "A seemingly innocent game download that secretly installs keyloggers",
    defense: "Use antivirus software, keep systems updated, and only download from trusted sources"
  },
  {
    icon: FaEye,
    title: "Social Engineering",
    description: "Psychological manipulation to trick people into revealing confidential information or performing actions.",
    example: "Someone calling pretending to be IT support and asking for your login credentials",
    defense: "Verify identities, be skeptical of urgent requests, and never share sensitive info over the phone"
  },
  {
    icon: FaNetworkWired,
    title: "Man-in-the-Middle",
    description: "Attackers secretly intercept and possibly alter communication between two parties who believe they're talking directly to each other.",
    example: "Hacker intercepting your data on unsecured public WiFi",
    defense: "Use VPNs on public networks, ensure websites use HTTPS, and avoid sensitive transactions on public WiFi"
  }
];

const roles = [
  {
    icon: FaCode,
    title: "Full-Stack Developer",
    description: "Builds both front-end (what users see) and back-end (server/database) parts of web applications.",
    tasks: [
      "Design and implement user interfaces with React, Vue, or Angular",
      "Build server-side APIs and databases",
      "Ensure applications are responsive and work across devices",
      "Write clean, maintainable, and efficient code",
      "Collaborate with designers, product managers, and other developers"
    ],
    skills: ["JavaScript/TypeScript", "React/Next.js", "Node.js", "Databases", "Git"]
  },
  {
    icon: FaShieldAlt,
    title: "Cybersecurity Specialist",
    description: "Protects organizations from cyber threats by identifying vulnerabilities, implementing security measures, and responding to incidents.",
    tasks: [
      "Conduct penetration testing to find vulnerabilities",
      "Monitor networks for security breaches",
      "Implement security tools and protocols",
      "Investigate security incidents and respond to attacks",
      "Educate employees about security best practices"
    ],
    skills: ["Network Security", "Penetration Testing", "Risk Assessment", "Incident Response", "Security Tools"]
  },
  {
    icon: FaGraduationCap,
    title: "Security Engineer",
    description: "Designs and builds secure systems and infrastructure, combining development skills with security expertise.",
    tasks: [
      "Design secure network and system architectures",
      "Implement security automation and monitoring",
      "Develop security tools and scripts",
      "Review code for security vulnerabilities",
      "Stay updated on latest security threats and technologies"
    ],
    skills: ["Secure Coding", "Cloud Security", "DevSecOps", "Scripting", "System Design"]
  }
];

const tips = [
  {
    icon: FaLock,
    title: "Use Strong Passwords",
    description: "Create unique, complex passwords for each account. Use a password manager to keep track of them all.",
    tip: "Try passphrases like 'Coffee-Mountain-Bicycle-Purple-7!' instead of simple passwords"
  },
  {
    icon: FaMobileAlt,
    title: "Enable Two-Factor Authentication",
    description: "Add an extra layer of security by requiring a second form of verification beyond just your password.",
    tip: "Use authenticator apps like Google Authenticator or Authy instead of SMS when possible"
  },
  {
    icon: FaGlobe,
    title: "Keep Software Updated",
    description: "Regularly update your operating system, browsers, and applications to patch security vulnerabilities.",
    tip: "Enable automatic updates whenever possible to stay protected"
  },
  {
    icon: FaDatabase,
    title: "Backup Your Data",
    description: "Regularly backup important files to protect against data loss from hardware failure, theft, or ransomware.",
    tip: "Follow the 3-2-1 rule: 3 copies, 2 different media types, 1 offsite backup"
  },
  {
    icon: FaEye,
    title: "Think Before You Click",
    description: "Be cautious with links and attachments, especially in emails from unknown senders.",
    tip: "Hover over links to see the actual URL before clicking, and verify unexpected messages"
  },
  {
    icon: FaTools,
    title: "Use Security Tools",
    description: "Install and maintain antivirus software, firewalls, and use VPNs on public networks.",
    tip: "Windows Defender is built-in and effective, but consider additional tools for extra protection"
  }
];

export function Cybersecurity101() {
  return (
    <Section id="cybersecurity-101" className="bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f] to-[#0d0d14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
            Cybersecurity 101
          </h2>
          <p className="text-xl text-gray-400 mb-4">
            Understanding Digital Security in the Modern World
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Whether you're new to tech or looking to understand how to stay safe online, 
            this guide covers the fundamentals of cybersecurity and the exciting careers in this field.
          </p>
        </motion.div>

        {/* Core Concepts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            The CIA Triad: Foundation of Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {concepts.map((concept, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-300 group">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <concept.icon className="text-cyan-400 text-xl" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{concept.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{concept.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Common Threats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Common Cyber Threats & How to Defend Against Them
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {threats.map((threat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/5 border-white/10 hover:border-red-500/30 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <threat.icon className="text-red-400 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">{threat.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">{threat.description}</p>
                        
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-3">
                          <p className="text-xs text-red-400 font-medium mb-1">Example Attack:</p>
                          <p className="text-xs text-gray-300">{threat.example}</p>
                        </div>
                        
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                          <p className="text-xs text-green-400 font-medium mb-1">How to Defend:</p>
                          <p className="text-xs text-gray-300">{threat.defense}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Paths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Exciting Careers in Tech & Security
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/5 border-white/10 hover:border-purple-500/50 transition-all duration-300">
                  <div className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                      <role.icon className="text-purple-400 text-2xl" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{role.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{role.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs text-purple-400 font-medium mb-2">What They Do:</p>
                      <ul className="space-y-1">
                        {role.tasks.map((task, i) => (
                          <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-xs text-purple-400 font-medium mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.skills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Stay Safe Online: Essential Tips for Everyone
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <tip.icon className="text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white mb-2">{tip.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">{tip.description}</p>
                        <div className="bg-green-500/10 rounded-lg p-2">
                          <p className="text-xs text-green-400">
                            <span className="font-medium">💡 Pro tip:</span> {tip.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <Card className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/30">
            <div className="p-8">
              <FaLightbulb className="text-4xl text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Cybersecurity Journey?
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Cybersecurity is one of the most exciting and in-demand fields in tech. 
                Whether you want to protect organizations from attacks, build secure applications, 
                or help people stay safe online, there's a place for you in this field.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.open('https://tryhackme.com', '_blank')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  Start Learning on TryHackMe
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('https://www.cyberseek.org/pathway.html', '_blank')}
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                >
                  Explore Career Paths
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}