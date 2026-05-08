import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oscar | Cybersecurity Specialist & Full-Stack Developer',
  description: 'Portfolio of Oscar - a Cybersecurity Specialist and Full-Stack Developer who breaks things to make them stronger, then builds them better.',
  keywords: ['cybersecurity', 'full-stack developer', 'penetration testing', 'web development', 'portfolio', 'ethical hacking'],
  authors: [{ name: 'Oscar' }],
  openGraph: {
    title: 'Oscar | Cybersecurity Specialist & Full-Stack Developer',
    description: 'Portfolio of Oscar - a Cybersecurity Specialist and Full-Stack Developer.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oscar | Cybersecurity Specialist & Full-Stack Developer',
    description: 'Portfolio of Oscar - a Cybersecurity Specialist and Full-Stack Developer.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}