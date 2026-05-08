// Portfolio data types
export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'cybersecurity' | 'development' | 'tools';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface LearningJourney {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'cybersecurity' | 'development' | 'certification';
  progress?: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

// GitHub API types
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  topics: string[];
}

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubLanguage {
  [language: string]: number;
}

// TryHackMe types
export interface TryHackMeStats {
  username: string;
  level: number;
  rank: number;
  xp: number;
  badges: TryHackMeBadge[];
  completedRooms: number;
  streakDays: number;
}

export interface TryHackMeBadge {
  id: string;
  name: string;
  icon: string;
  earnedAt: string;
}

// Visitor tracking types
export interface VisitorData {
  id: string;
  timestamp: string;
  page: string;
  userAgent: string;
  referrer: string;
  ip: string;
  country?: string;
  city?: string;
  device: {
    type: string;
    browser: string;
    os: string;
  };
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: { [page: string]: number };
  recentVisitors: VisitorData[];
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  browserStats: { [browser: string]: number };
}

// Chatbot types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatBotResponse {
  question: string | RegExp;
  answer: string;
  keywords?: string[];
}

// Admin types
export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthSession {
  userId: string;
  email: string;
  expiresAt: string;
}

// About section types
export interface AboutData {
  description: string;
  highlights: string[];
}

// Hero section types
export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  typedTexts: string[];
  resumeUrl: string;
}

// Content management types
export interface PortfolioContent {
  hero: HeroData;
  about: AboutData;
  socialLinks: SocialLink[];
  navigation: NavLink[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}