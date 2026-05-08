'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { personalInfo, skills, projects, experiences } from '@/data/portfolio';
import { FaRobot, FaPaperPlane, FaTrash } from 'react-icons/fa';
import { generateId } from '@/utils/helpers';
import type { ChatMessage } from '@/types';

// Chat bot responses based on portfolio data
const chatBotResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    answer: `Hey! I'm Oscar's AI assistant. How can I help you today? Feel free to ask about his skills, projects, experience, or how to get in touch!`,
  },
  {
    keywords: ['what can you do', 'help', 'assist', 'capabilities'],
    answer: `I can tell you all about Oscar! I can share info about his:\n• Technical skills (he knows ${skills.length}+ tools/languages)\n• Projects (he's built ${projects.length} cool things)\n• Work experience and certifications\n• How to contact him\n\nJust ask away!`,
  },
  {
    keywords: ['about oscar', 'tell me about', 'who is oscar', 'bio'],
    answer: `Oscar is a Cybersecurity Specialist & Full-Stack Developer. As he puts it: "I break things so they become stronger. Then I build them better." He spends his days knee-deep in code and his nights hunting vulnerabilities. He thinks like an attacker, codes like an engineer, and explains like a teacher. Pretty cool combo, right?`,
  },
  {
    keywords: ['skills', 'technologies', 'what does he know', 'can he'],
    answer: `Oscar is skilled in a ton of areas:\n• Languages: JavaScript/TypeScript (95%), Python (90%), Go, Rust, Bash, SQL\n• Frameworks: React/Next.js, Node.js, Express, Tailwind CSS\n• Security: Penetration Testing, OWASP Top 10, Burp Suite, Metasploit\n• Tools: Docker, Kubernetes, Git, AWS, Linux\n\nHe's got ${skills.length} skills listed total. Impressive, I know!`,
  },
  {
    keywords: ['project', 'work', 'portfolio', 'what has he built', 'github'],
    answer: `Oscar has built some really cool stuff:\n${projects.map(p => `• **${p.title}** - ${p.description.split('.')[0]}`).join('\n')}\n\nAll his projects combine development skills with security best practices. You can check out his GitHub at ${personalInfo.social.github}`,
  },
  {
    keywords: ['experience', 'work history', 'job', 'employment'],
    answer: `Oscar's journey includes:\n${experiences.filter(e => e.type === 'work').map(e => `• **${e.title}** at ${e.company} (${e.period})`).join('\n')}\n\nHe's also got certifications including CompTIA Security+ and Certified Ethical Hacker (CEH).`,
  },
  {
    keywords: ['contact', 'email', 'reach', 'get in touch', 'linkedin', 'twitter'],
    answer: `You can reach Oscar in several ways:\n• Email: ${personalInfo.email}\n• GitHub: ${personalInfo.social.github}\n• LinkedIn: ${personalInfo.social.linkedin}\n• Twitter: ${personalInfo.social.twitter}\n\nHe typically responds within 24-48 hours!`,
  },
  {
    keywords: ['certification', 'cert', 'security+', 'ceh'],
    answer: `Oscar has some solid certifications:\n${experiences.filter(e => e.type === 'certification').map(e => `• **${e.title}** from ${e.company} (${e.period})`).join('\n')}\n\nHe's always learning and staying current with the latest in cybersecurity.`,
  },
  {
    keywords: ['tryhackme', 'thm', 'hack', 'ctf'],
    answer: `Oscar is active on TryHackMe! He's ranked in the Top 1% with ${projects.length}+ rooms completed and 45,000+ XP. He's earned badges in Cyber Defense, Bug Hunting, and Network+. Check out his profile at tryhackme.com/p/${personalInfo.social.github.replace('https://github.com/', '')}`,
  },
];

const fallbackResponse = `Hmm, I'm not sure I understand that question. Try asking about Oscar's skills, projects, experience, certifications, or how to contact him. I'm here to help!`;

export function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: 'assistant',
      content: `Hey there! I'm Oscar's AI portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch. I'm here to help!`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Check for keyword matches
    for (const response of chatBotResponses) {
      if (response.keywords) {
        for (const keyword of response.keywords) {
          if (lowerQuestion.includes(keyword.toLowerCase())) {
            return response.answer;
          }
        }
      }
    }
    
    return fallbackResponse;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    const thinkingTime = 800 + Math.random() * 700;
    setTimeout(() => {
      const response = findResponse(userMessage.content);
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: generateId(),
        role: 'assistant',
        content: `Chat cleared! What would you like to know about Oscar?`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // Quick action buttons
  const quickActions = [
    { label: "What can you do?", query: "What can you help me with?" },
    { label: "Tell me about Oscar", query: "Tell me about Oscar" },
    { label: "Show projects", query: "Show me Oscar's projects" },
    { label: "How to contact?", query: "How can I contact Oscar?" },
  ];

  return (
    <section id="chat" className="py-20 px-4 relative">
      <Container size="md">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <FaRobot className="text-white" size={24} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              AI{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                Assistant
              </span>
            </h2>
          </div>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Have questions? Ask Oscar's AI assistant anything about his skills, projects, or experience.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="h-[500px] flex flex-col p-0 overflow-hidden" glow="pink">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <FaRobot className="text-white" size={18} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Portfolio Assistant</h3>
                  <p className="text-gray-400 text-xs">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Clear chat"
              >
                <FaTrash size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-br-md'
                        : 'bg-white/10 text-gray-200 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-white/10 bg-white/5">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setInputValue(action.query);
                      handleSend();
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-gray-300 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 p-4 border-t border-white/10 bg-white/5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question here..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 text-sm"
              />
              <motion.button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane size={16} />
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}