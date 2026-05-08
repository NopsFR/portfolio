'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FaGithub, 
  FaStar, 
  FaCodeBranch, 
  FaUsers, 
  FaLock, 
  FaShieldAlt,
  FaEye,
  FaBook,
  FaTools,
  FaBug,
  FaNetworkWired,
  FaTerminal,
  FaExternalLinkAlt
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

// Note: These are example repositories. In a real implementation, you would fetch from GitHub API
const securityRepos = [
  {
    name: "awesome-infosec",
    description: "A curated list of awesome information security resources, tools, and references for security professionals and enthusiasts.",
    stars: 12500,
    forks: 2100,
    language: "Markdown",
    topics: ["infosec", "security", "cybersecurity", "resources", "awesome"],
    url: "https://github.com/0x4D31/awesome-infosec",
    icon: FaBook,
    category: "Resources"
  },
  {
    name: "security-cheatsheets",
    description: "Collection of security cheat sheets covering OWASP Top 10, secure coding practices, and penetration testing methodologies.",
    stars: 8900,
    forks: 1500,
    language: "Markdown",
    topics: ["security", "cheatsheets", "owasp", "pentesting"],
    url: "https://github.com/owasp/CheatSheetSeries",
    icon: FaBook,
    category: "Reference"
  },
  {
    name: "nmap",
    description: "Network exploration and security auditing tool. Essential for network discovery and security scanning.",
    stars: 9200,
    forks: 2300,
    language: "C/C++",
    topics: ["network", "security", "scanner", "nmap", "pentesting"],
    url: "https://github.com/nmap/nmap",
    icon: FaNetworkWired,
    category: "Tools"
  },
  {
    name: "metasploit-framework",
    description: "The world's most used penetration testing framework. Helps security professionals test the security of their systems.",
    stars: 11200,
    forks: 3800,
    language: "Ruby",
    topics: ["metasploit", "pentesting", "exploit", "security"],
    url: "https://github.com/rapid7/metasploit-framework",
    icon: FaTools,
    category: "Tools"
  },
  {
    name: "burpsuite-community",
    description: "Burp Suite Community Edition - The leading tool for web application security testing.",
    stars: 6700,
    forks: 1200,
    language: "Java",
    topics: ["burpsuite", "web-security", "pentesting", "proxy"],
    url: "https://github.com/PortSwigger/burp-suite-community",
    icon: FaBug,
    category: "Tools"
  },
  {
    name: "opsec-tools",
    description: "Collection of operational security tools and techniques for maintaining privacy and anonymity online.",
    stars: 4500,
    forks: 890,
    language: "Python",
    topics: ["opsec", "privacy", "anonymity", "security"],
    url: "https://github.com/NamelessNomad/opsec-tools",
    icon: FaEye,
    category: "OPSEC"
  },
  {
    name: "linpeas",
    description: "Linux Privilege Escalation Awesome Script. Helps identify privilege escalation paths in Linux systems.",
    stars: 7800,
    forks: 1100,
    language: "Bash",
    topics: ["privilege-escalation", "linux", "pentesting", "security"],
    url: "https://github.com/carlospolop/PEASS-ng",
    icon: FaTerminal,
    category: "Tools"
  },
  {
    name: "windows-privesc-check",
    description: "Script to check for privilege escalation vulnerabilities on Windows systems.",
    stars: 3200,
    forks: 650,
    language: "PowerShell",
    topics: ["windows", "privilege-escalation", "security", "pentesting"],
    url: "https://github.com/carlospolop/PEASS-ng",
    icon: FaLock,
    category: "Tools"
  }
];

const categories = [
  { name: "All", icon: FaCodeBranch },
  { name: "Tools", icon: FaTools },
  { name: "Resources", icon: FaBook },
  { name: "OPSEC", icon: FaEye },
  { name: "Reference", icon: FaShieldAlt }
];

export function GitHubSecurity() {
  return (
    <Section id="github-security" className="bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaGithub className="text-4xl text-white" />
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Security Resources
            </h2>
          </div>
          <p className="text-xl text-gray-400 mb-4">
            Essential OpSec & InfoSec GitHub Repositories
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto">
            A curated collection of open-source security tools, resources, and references 
            that every cybersecurity enthusiast and professional should know about.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: "Total Repos", value: "8+", icon: FaCodeBranch, color: "cyan" },
            { label: "Total Stars", value: "64K+", icon: FaStar, color: "yellow" },
            { label: "Total Forks", value: "13K+", icon: FaUsers, color: "green" },
            { label: "Categories", value: "4", icon: FaBook, color: "purple" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 hover:border-cyan-500/30 transition-all">
                <div className="p-4 text-center">
                  <stat.icon className={`text-2xl mx-auto mb-2 text-${stat.color}-400`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Repository Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {securityRepos.map((repo, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-300 group">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <repo.icon className="text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {repo.name}
                        </h3>
                        <span className="text-xs text-gray-500">{repo.category}</span>
                      </div>
                    </div>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {repo.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 4).map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCodeBranch className="text-green-400" />
                      <span>{repo.forks.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>{repo.language}</span>
                    </div>
                  </div>

                  {/* View Button */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(repo.url, '_blank')}
                      className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      <FaGithub className="mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border-purple-500/30">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Contribute to Open Source Security
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                These projects welcome contributions from the community. Whether it's code, 
                documentation, or bug reports, every contribution helps make the internet safer for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.open('https://github.com/topics/cybersecurity', '_blank')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <FaGithub className="mr-2" />
                  Explore More Security Projects
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('https://github.com', '_blank')}
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  Create Your GitHub Account
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}