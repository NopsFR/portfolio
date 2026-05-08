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
  bio: `Hey, I'm Oscar. I spend my days knee-deep in code and my nights hunting vulnerabilities. 
There's something addictive about finding that one flaw everyone else missed — that "aha!" 
moment when the puzzle pieces click. I'm not your typical developer who just builds features. 
I think like an attacker, code like an engineer, and explain like a teacher. Whether I'm 
pen-testing a web app, automating security workflows, or building tools that help other 
developers sleep better at night, I'm all in. When I'm not staring at terminal windows, 
you'll probably find me grinding on TryHackMe rooms or contributing to open-source security 
projects. Yeah, I know — I need to get out more.`,
  email: "oscar@example.com",
  location: "Remote / Worldwide",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
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
    title: "THM Room Writeup Blog",
    description: "Technical writeups for 30+ TryHackMe rooms. Built with Next.js and Markdown for easy content management.",
    image: "/projects/writeup-blog.jpg",
    tags: ["Next.js", "Markdown", "TryHackMe", "Writeups"],
    link: "https://oscarwrites.tech",
    github: "https://github.com/yourusername/thm-writeups",
  },
  {
    id: 2,
    title: "Home Lab Dashboard",
    description: "Monitors Raspberry Pi cluster running vulnerable VMs. Features real-time status, resource tracking, and quick access to security tools.",
    image: "/projects/home-lab.jpg",
    tags: ["Python", "Flask", "Docker", "Home Lab", "TryHackMe"],
    github: "https://github.com/yourusername/home-lab-dashboard",
  },
  {
    id: 3,
    title: "CTF Note Organizer",
    description: "Personal wiki for CTF and penetration testing notes. Includes tagging, full-text search, and categorized exploit documentation.",
    image: "/projects/ctf-notes.jpg",
    tags: ["React", "Node.js", "SQLite", "TryHackMe", "Notes"],
    github: "https://github.com/yourusername/ctf-notes",
  },
  {
    id: 4,
    title: "Password Strength Checker",
    description: "Browser-based password security analyzer. Tests against brute force, dictionary attacks, and common password lists without sending data to servers.",
    image: "/projects/password-checker.jpg",
    tags: ["JavaScript", "Cryptography", "TryHackMe", "Security"],
    link: "https://passwordcheck.oscarwrites.tech",
    github: "https://github.com/yourusername/password-strength-checker",
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
