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

const Projects = dynamic(
  () => import('@/components/sections').then((mod) => mod.Projects),
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
    <main className="relative min-h-screen">
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

      {/* Projects Section */}
      <Projects />

      {/* Journey Section */}
      <Journey />

      {/* TryHackMe Section */}
      <TryHackMe />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* AI Chatbot */}
      <ChatBot />
    </main>
  );
}