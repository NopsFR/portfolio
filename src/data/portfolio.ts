export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'languages' | 'frameworks' | 'tools' | 'security';
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'certification';
}

export const personalInfo = {
  name: "Oscar",
  title: "Cybersecurity Specialist & Full-Stack Developer",
  tagline: "I break things so they become stronger. Then I build them better.",
  bio: `Hey, I'm Oscar. I code, I break things, I learn — that's basically my whole personality at this point. I got into cybersecurity through TryHackMe and never looked back. There's something about finding that one vulnerability everyone else missed that just hits different. I spend most of my time either grinding THM rooms, working on security tools, or deep in some CTF challenge. I've got my Security+ and CEH, and I'm always chasing the next cert. When I'm not staring at a terminal, I'm probably writing about what I've learned — room writeups, tool breakdowns, stuff like that. If you're into security or just want to talk tech, feel free to reach out. Always happy to connect with people who get it.`,
  email: "Nopsrust@gmail.com",
  location: "Remote / Worldwide",
  // Hacker-themed profile image
  avatar: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
  social: {
    github: "https://github.com/NopsFR",
    linkedin: "https://www.linkedin.com/in/oscar-senior-868b2a3a4/",
  },
};

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Junior Security Analyst",
    company: "TechCorp Inc.",
    period: "2023 — Present",
    description: "Started my cybersecurity journey. Learning security scanning and vulnerability assessment.",
    type: "work",
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    period: "2021 — 2023",
    description: "Built a React/Node.js platform. Implemented authentication and payment processing.",
    type: "work",
  },
  {
    id: 3,
    title: "CompTIA Security+",
    company: "CompTIA",
    period: "2024",
    description: "Security+ certification. Learned security fundamentals and best practices.",
    type: "certification",
  },
  {
    id: 4,
    title: "Certified Ethical Hacker (CEH)",
    company: "EC-Council",
    period: "2025",
    description: "CEH certification. Studied penetration testing and ethical hacking methodologies.",
    type: "certification",
  },
];

export const skills: Skill[] = [
  // Languages (honed through TryHackMe scripting challenges)
  { name: "Python", level: 90, category: "languages" },
  { name: "Bash", level: 85, category: "languages" },
  { name: "JavaScript/TypeScript", level: 80, category: "languages" },
  { name: "SQL", level: 80, category: "languages" },
  { name: "Go", level: 65, category: "languages" },
  
  // Frameworks (built while applying THM concepts)
  { name: "React/Next.js", level: 85, category: "frameworks" },
  { name: "Node.js", level: 82, category: "frameworks" },
  { name: "Express.js", level: 80, category: "frameworks" },
  { name: "Tailwind CSS", level: 85, category: "frameworks" },
  { name: "Django", level: 65, category: "frameworks" },
  
  // Tools (mastered through TryHackMe hands-on labs)
  { name: "Linux", level: 90, category: "tools" },
  { name: "Git", level: 85, category: "tools" },
  { name: "Docker", level: 80, category: "tools" },
  { name: "Nmap", level: 88, category: "tools" },
  { name: "Burp Suite", level: 80, category: "tools" },
  { name: "Metasploit", level: 75, category: "tools" },
  { name: "Wireshark", level: 75, category: "tools" },
  { name: "AWS", level: 70, category: "tools" },
  { name: "Kubernetes", level: 65, category: "tools" },
  { name: "CI/CD (GitHub Actions)", level: 75, category: "tools" },
  
  // Security (directly from TryHackMe curriculum)
  { name: "OWASP Top 10", level: 92, category: "security" },
  { name: "Penetration Testing", level: 85, category: "security" },
  { name: "Web Exploitation", level: 88, category: "security" },
  { name: "Network Security", level: 85, category: "security" },
  { name: "Cryptography", level: 78, category: "security" },
  { name: "Reverse Engineering", level: 70, category: "security" },
  { name: "Forensics", level: 72, category: "security" },
  { name: "Privilege Escalation", level: 82, category: "security" },
  { name: "Security Auditing", level: 80, category: "security" },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "OWASP Top 10 Lab",
    description: "Interactive web application showcasing solutions for all OWASP Top 10 vulnerabilities. Built as a learning tool for secure coding practices.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    tags: ["React", "Node.js", "OWASP", "Security", "TryHackMe"],
    link: "https://owasplab.oscarwrites.tech",
    github: "https://github.com/NopsFR/owasp-top10-lab",
  },
  {
    id: 2,
    title: "Network Scanner CLI",
    description: "Advanced network reconnaissance tool inspired by TryHackMe rooms. Features port scanning, service detection, and vulnerability assessment.",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80",
    tags: ["Python", "Nmap", "Network Security", "TryHackMe"],
    github: "https://github.com/NopsFR/network-scanner",
  },
  {
    id: 3,
    title: "CTF Writeup Platform",
    description: "Markdown-based platform for documenting CTF challenges and TryHackMe room completions. Features syntax highlighting and category filtering.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    tags: ["Next.js", "Markdown", "CTF", "TryHackMe", "Blog"],
    link: "https://ctfwrites.tech",
    github: "https://github.com/NopsFR/ctf-writeups",
  },
  {
    id: 4,
    title: "Vulnerability Scanner",
    description: "Automated security scanner for web applications. Detects common vulnerabilities like SQL injection, XSS, and directory traversal.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    tags: ["Python", "Security", "Automation", "TryHackMe"],
    github: "https://github.com/NopsFR/vuln-scanner",
  },
];

export const tryHackMeStats = {
  username: "Oscar.Senior",
  profileUrl: "https://tryhackme.com/p/Oscar.Senior",
  rank: "Guru",
  topPercent: "Top 1%",
  totalXp: 65432,
  completedRooms: 127,
  badges: [
    { name: "Cyber Defense", icon: "shield" },
    { name: "Bug Hunter", icon: "bug" },
    { name: "Network+", icon: "network" },
    { name: "Web Fundamentals", icon: "web" },
    { name: "Linux Fundamentals", icon: "linux" },
    { name: "Python Basics", icon: "python" },
  ],
  certificates: [
    "Cyber Defense",
    "Bug Hunter",
    "Network+",
    "Web Fundamentals",
    "Linux Fundamentals",
    "Python Basics",
  ],
};

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "TryHackMe", href: "#tryhackme" },
  { name: "Cybersecurity 101", href: "#cybersecurity-101" },
  { name: "Security Demo", href: "#security-demo" },
  { name: "Contact", href: "#contact" },
  { name: "Chat", href: "#chat" },
];

// Hacker-themed background images for sections
export const sectionImages = {
  hero: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80",
  about: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  skills: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  projects: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  journey: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&q=80",
};