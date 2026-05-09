'use client';

import dynamic from 'next/dynamic';

// Dynamically import client-only components
const AnimatedBackground = dynamic(
  () => import('@/components/ui/AnimatedBackground').then((mod) => mod.AnimatedBackground),
  { ssr: false }
);

const MouseGlow = dynamic(
  () => import('@/components/ui/AnimatedBackground').then((mod) => mod.MouseGlow),
  { ssr: false }
);

const Navbar = dynamic(
  () => import('@/components/sections').then((mod) => mod.Navbar),
  { ssr: false }
);

const Hero = dynamic(
  () => import('@/components/sections').then((mod) => mod.Hero),
  { ssr: false }
);

const About = dynamic(
  () => import('@/components/sections').then((mod) => mod.About),
  { ssr: false }
);

const Skills = dynamic(
  () => import('@/components/sections').then((mod) => mod.Skills),
  { ssr: false }
);

const HackerTypes = dynamic(
  () => import('@/components/sections').then((mod) => mod.HackerTypes),
  { ssr: false }
);

const LearningPaths = dynamic(
  () => import('@/components/sections').then((mod) => mod.LearningPaths),
  { ssr: false }
);

const Journey = dynamic(
  () => import('@/components/sections').then((mod) => mod.Journey),
  { ssr: false }
);

const TryHackMe = dynamic(
  () => import('@/components/sections').then((mod) => mod.TryHackMe),
  { ssr: false }
);

const SecurityDemo = dynamic(
  () => import('@/components/sections').then((mod) => mod.SecurityDemo),
  { ssr: false }
);

const Cybersecurity101 = dynamic(
  () => import('@/components/sections').then((mod) => mod.Cybersecurity101),
  { ssr: false }
);

const GitHubSecurity = dynamic(
  () => import('@/components/sections').then((mod) => mod.GitHubSecurity),
  { ssr: false }
);

const ChatBot = dynamic(
  () => import('@/components/sections').then((mod) => mod.ChatBot),
  { ssr: false }
);

const Contact = dynamic(
  () => import('@/components/sections').then((mod) => mod.Contact),
  { ssr: false }
);

const Footer = dynamic(
  () => import('@/components/sections').then((mod) => mod.Footer),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center">
      {/* Background Effects */}
      <AnimatedBackground />
      <MouseGlow />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Hacker Types Section */}
      <HackerTypes />

      {/* Learning Paths Section */}
      <LearningPaths />

      {/* Journey Section */}
      <Journey />

      {/* TryHackMe Section */}
      <TryHackMe />

      {/* Security Demo Section */}
      <SecurityDemo />

      {/* Cybersecurity 101 Section */}
      <Cybersecurity101 />

      {/* GitHub Security Resources Section */}
      <GitHubSecurity />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* AI Chatbot */}
      <ChatBot />
    </main>
  );
}