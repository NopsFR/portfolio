import type { 
  Skill, 
  Project, 
  Certification, 
  LearningJourney, 
  SocialLink, 
  NavLink,
  ChatBotResponse 
} from '@/types';

// Navigation links
export const navigationLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

// Social links - Editable via admin panel
export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/NopsFR',
    icon: 'FaGithub',
    label: 'GitHub Profile',
  },
  {
    platform: 'TryHackMe',
    url: 'https://tryhackme.com/p/Oscar.Senior',
    icon: 'FaHackerrank',
    label: 'TryHackMe Profile',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/oscar-senior-868b2a3a4/',
    icon: 'FaLinkedin',
    label: 'LinkedIn Profile',
  },
  {
    platform: 'Email',
    url: 'mailto:Nopsrust@gmail.com',
    icon: 'FaEnvelope',
    label: 'Send Email',
  },
];

// Hero section data
export const heroData = {
  title: "Oscar",
  subtitle: "Cybersecurity Engineer & Full-Stack Developer",
  description: "Building secure, scalable solutions at the intersection of development and security",
  typedTexts: [
    "Cybersecurity Engineer",
    "Full-Stack Developer",
    "Cloud Enthusiast",
    "Security Researcher",
  ],
  resumeUrl: "/resume.pdf",
};

// About section data
export const aboutData = {
  description: `Passionate self-taught developer and cybersecurity enthusiast focused on modern web technologies, cloud-hosted systems, frontend engineering, IT infrastructure, and cybersecurity learning platforms. I combine a deep curiosity for how things work with a methodical approach to problem-solving, whether I'm building responsive web applications, hardening systems against threats, or automating workflows to improve efficiency.
  
  My journey into tech began with a fascination for understanding the inner workings of software and networks. Today, I channel that curiosity into continuous learning and hands-on projects that span both development and security domains. I believe in writing clean, maintainable code and designing systems with security as a first-class concern—not an afterthought.`,
  highlights: [
    "Self-taught developer with a focus on modern web technologies",
    "Cybersecurity enthusiast actively learning through hands-on labs",
    "Experience with cloud-hosted systems and infrastructure",
    "Strong foundation in IT troubleshooting and system administration",
    "Committed to writing secure, accessible, and performant code",
  ],
};

// Cybersecurity skills
export const cybersecuritySkills: Skill[] = [
  { id: '1', name: 'Network Security', level: 75, category: 'cybersecurity' },
  { id: '2', name: 'Linux Administration', level: 80, category: 'cybersecurity' },
  { id: '3', name: 'Windows Security', level: 70, category: 'cybersecurity' },
  { id: '4', name: 'Web Security', level: 72, category: 'cybersecurity' },
  { id: '5', name: 'Penetration Testing', level: 60, category: 'cybersecurity' },
  { id: '6', name: 'Incident Response', level: 55, category: 'cybersecurity' },
  { id: '7', name: 'Security Awareness', level: 85, category: 'cybersecurity' },
  { id: '8', name: 'Cloud Security', level: 65, category: 'cybersecurity' },
];

// Development skills
export const developmentSkills: Skill[] = [
  { id: '9', name: 'TypeScript', level: 85, category: 'development' },
  { id: '10', name: 'React / Next.js', level: 88, category: 'development' },
  { id: '11', name: 'Node.js', level: 78, category: 'development' },
  { id: '12', name: 'Python', level: 70, category: 'development' },
  { id: '13', name: 'Tailwind CSS', level: 90, category: 'development' },
  { id: '14', name: 'SQL / Databases', level: 68, category: 'development' },
  { id: '15', name: 'Git / Version Control', level: 85, category: 'development' },
  { id: '16', name: 'CI/CD Pipelines', level: 65, category: 'development' },
];

// Tools & Technologies
export const toolsSkills: Skill[] = [
  { id: '17', name: 'Docker', level: 72, category: 'tools' },
  { id: '18', name: 'AWS / Cloud', level: 65, category: 'tools' },
  { id: '19', name: 'Wireshark', level: 60, category: 'tools' },
  { id: '20', name: 'Burp Suite', level: 55, category: 'tools' },
  { id: '21', name: 'Metasploit', level: 50, category: 'tools' },
  { id: '22', name: 'Nmap', level: 75, category: 'tools' },
  { id: '23', name: 'VS Code', level: 95, category: 'tools' },
  { id: '24', name: 'Terraform', level: 45, category: 'tools' },
];

// Projects
export const projects: Project[] = [
  {
    id: '1',
    title: 'Secure Web Application',
    description: 'A full-stack web application with integrated security features including authentication, authorization, input validation, and protection against common vulnerabilities like XSS and CSRF.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Auth.js'],
    githubUrl: 'https://github.com/NopsFR',
    featured: true,
  },
  {
    id: '2',
    title: 'Network Security Scanner',
    description: 'A Python-based tool for scanning and analyzing network vulnerabilities, featuring automated reporting and integration with common security frameworks.',
    technologies: ['Python', 'Nmap', 'Docker'],
    githubUrl: 'https://github.com/NopsFR',
    featured: true,
  },
  {
    id: '3',
    title: 'Cloud Infrastructure Manager',
    description: 'Infrastructure as Code solution for managing cloud resources with Terraform, featuring automated deployment pipelines and security scanning.',
    technologies: ['Terraform', 'AWS', 'GitHub Actions'],
    githubUrl: 'https://github.com/NopsFR',
    featured: false,
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'This premium cybersecurity portfolio website built with Next.js, featuring glassmorphism design, animated backgrounds, and integrated analytics.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/NopsFR',
    featured: true,
  },
];

// Certifications
export const certifications: Certification[] = [
  {
    id: '1',
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: '2024',
    credentialId: 'XXXX-XXXX',
  },
  {
    id: '2',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
  },
];

// Learning Journey
export const learningJourney: LearningJourney[] = [
  {
    id: '1',
    title: 'Started Cybersecurity Journey',
    description: 'Began learning cybersecurity fundamentals through TryHackMe and hands-on labs, focusing on network security and ethical hacking.',
    date: '2023',
    category: 'cybersecurity',
  },
  {
    id: '2',
    title: 'Full-Stack Development',
    description: 'Deepened knowledge in modern web development with React, Next.js, and TypeScript, building production-ready applications.',
    date: '2023',
    category: 'development',
  },
  {
    id: '3',
    title: 'Cloud Technologies',
    description: 'Expanded skills in cloud computing with AWS, learning about infrastructure, security, and scalable architectures.',
    date: '2024',
    category: 'development',
  },
  {
    id: '4',
    title: 'Advanced Security Topics',
    description: 'Currently exploring advanced penetration testing, incident response, and security automation.',
    date: '2024',
    category: 'cybersecurity',
    progress: 65,
  },
];

// ChatBot responses
export const chatBotResponses: ChatBotResponse[] = [
  {
    question: /(?:what|tell me).*cybersecurity.*skills/i,
    answer: "Oscar has strong skills in Network Security, Linux Administration, Windows Security, Web Security, and Security Awareness. He's actively learning penetration testing and incident response through hands-on platforms like TryHackMe.",
    keywords: ['cybersecurity', 'security', 'skills'],
  },
  {
    question: /(?:what|tell me).*technolog(?:y|ies)|tech stack/i,
    answer: "Oscar works with TypeScript, React, Next.js, Node.js, Python, Tailwind CSS, and various cloud technologies. He's proficient in modern frontend development and is expanding his backend and DevOps skills.",
    keywords: ['technology', 'technologies', 'stack', 'tech'],
  },
  {
    question: /(?:what|which).*platform/i,
    answer: "Oscar primarily learns on TryHackMe for cybersecurity and uses GitHub for version control and project hosting. He's also active on various online learning platforms for continuous skill development.",
    keywords: ['platform', 'learn', 'learning'],
  },
  {
    question: /(?:tell me about|who is).*oscar/i,
    answer: "Oscar is a passionate self-taught developer and cybersecurity enthusiast focused on modern web technologies, cloud-hosted systems, frontend engineering, IT infrastructure, and cybersecurity learning platforms. He combines development skills with security knowledge to build secure, scalable solutions.",
    keywords: ['oscar', 'about', 'who'],
  },
  {
    question: /(?:show|github).*project/i,
    answer: "Oscar has several projects including a Secure Web Application, Network Security Scanner, Cloud Infrastructure Manager, and this Portfolio Website. You can explore all projects at github.com/NopsFR",
    keywords: ['github', 'projects', 'show'],
  },
  {
    question: /tryhackme|thm.*progress/i,
    answer: "Oscar is actively learning on TryHackMe, working through security paths and challenges. Visit tryhackme.com/p/Oscar.Senior to see his current progress, badges, and achievements.",
    keywords: ['tryhackme', 'thm', 'progress'],
  },
  {
    question: /(?:how|contact).*(?:oscar|you)/i,
    answer: "You can reach Oscar through email, LinkedIn, Twitter, or GitHub. Check out the Contact section below or the social links in the navigation. He's always open to connecting with fellow developers and security enthusiasts!",
    keywords: ['contact', 'reach', 'email'],
  },
  {
    question: /(?:certification|cert)/i,
    answer: "Oscar holds CompTIA Security+ and AWS Certified Cloud Practitioner certifications, and is continuously working towards additional security and cloud certifications.",
    keywords: ['certification', 'cert'],
  },
  {
    question: /hello|hi|hey/i,
    answer: "Hello! I'm Oscar's AI portfolio assistant. How can I help you learn more about his skills, projects, and experience?",
    keywords: ['hello', 'hi', 'hey'],
  },
  {
    question: /help/i,
    answer: "I can help you learn about Oscar's cybersecurity skills, development technologies, projects, certifications, and how to contact him. Just ask away!",
    keywords: ['help'],
  },
];

// Default chatbot fallback response
export const chatBotFallback = "I'm not sure I understand that question. Try asking about Oscar's skills, technologies, projects, certifications, or how to contact him!";

// GitHub configuration
export const githubConfig = {
  username: 'NopsFR',
  baseUrl: 'https://api.github.com',
};

// TryHackMe configuration
export const tryhackmeConfig = {
  username: 'Oscar.Senior',
  profileUrl: 'https://tryhackme.com/p/Oscar.Senior',
};

// Site metadata
export const siteMetadata = {
  title: 'Oscar | Cybersecurity Engineer & Developer',
  description: 'Portfolio of Oscar - A passionate cybersecurity engineer and full-stack developer specializing in secure web applications, cloud technologies, and modern frontend engineering.',
  keywords: ['cybersecurity', 'developer', 'full-stack', 'security', 'react', 'nextjs', 'typescript', 'portfolio'],
  author: 'Oscar',
  url: 'https://oscar-portfolio.vercel.app',
};