'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  FaUsers,
  FaChartLine,
  FaEye,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaSignOutAlt,
  FaGithub,
  FaHackerrank,
  FaEnvelope,
  FaLink,
  FaSave,
  FaKey,
  FaLock,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import { SiTryhackme } from 'react-icons/si';

interface VisitorStats {
  totalVisits: number;
  pageViews: Record<string, number>;
  recentVisitors: Array<{
    timestamp: string;
    page: string;
    browser: string;
    os: string;
    device: string;
  }>;
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  browserStats: Record<string, number>;
}

interface SocialLinks {
  github: string;
  tryhackme: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'links' | 'security'>('overview');
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    github: 'https://github.com/NopsFR',
    tryhackme: 'https://tryhackme.com/p/Oscar.Senior',
    linkedin: 'https://www.linkedin.com/in/oscar-senior-868b2a3a4/',
    twitter: '',
    email: 'mailto:Nopsrust@gmail.com',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [newHash, setNewHash] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/visitor/track');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSaveLinks = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveMessage('Links saved successfully!');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 8 characters' });
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
        setNewHash(data.newHash);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordMessage({ type: 'error', text: data.error || 'Failed to change password' });
      }
    } catch (error) {
      setPasswordMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white">
                O
              </div>
              <div>
                <h1 className="text-white font-semibold">Admin Dashboard</h1>
                <p className="text-gray-400 text-xs">Portfolio Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Tab Navigation */}
              <div className="flex bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'overview'
                      ? 'bg-pink-500/20 text-pink-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
               <button
                 onClick={() => setActiveTab('links')}
                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                   activeTab === 'links'
                     ? 'bg-pink-500/20 text-pink-400'
                     : 'text-gray-400 hover:text-white'
                 }`}
               >
                 Social Links
               </button>
               <button
                 onClick={() => setActiveTab('security')}
                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                   activeTab === 'security'
                     ? 'bg-pink-500/20 text-pink-400'
                     : 'text-gray-400 hover:text-white'
                 }`}
               >
                 Security
               </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                isLoading={isLoggingOut}
                leftIcon={<FaSignOutAlt />}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card hover={false}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                      <FaUsers className="text-pink-400" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Visits</p>
                      <p className="text-2xl font-bold text-white">
                        {isLoading ? '-' : stats?.totalVisits || 0}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card hover={false}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <FaChartLine className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Page Views</p>
                      <p className="text-2xl font-bold text-white">
                        {isLoading
                          ? '-'
                          : Object.values(stats?.pageViews || {}).reduce(
                              (a, b) => a + b,
                              0
                            )}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card hover={false}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <FaDesktop className="text-cyan-400" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Desktop</p>
                      <p className="text-2xl font-bold text-white">
                        {isLoading
                          ? '-'
                          : stats?.deviceStats.desktop || 0}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card hover={false}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <FaMobile className="text-green-400" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Mobile</p>
                      <p className="text-2xl font-bold text-white">
                        {isLoading
                          ? '-'
                          : stats?.deviceStats.mobile || 0}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Page Views */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaEye className="text-pink-400" />
                  Page Views
                </h3>
                <div className="space-y-3">
                  {isLoading ? (
                    <p className="text-gray-400">Loading...</p>
                  ) : (
                    Object.entries(stats?.pageViews || {}).map(([page, views]) => (
                      <div
                        key={page}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                      >
                        <span className="text-gray-300 capitalize">{page}</span>
                        <Badge variant="pink">{views} views</Badge>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaChartLine className="text-purple-400" />
                  Browser Stats
                </h3>
                <div className="space-y-3">
                  {isLoading ? (
                    <p className="text-gray-400">Loading...</p>
                  ) : (
                    Object.entries(stats?.browserStats || {}).map(
                      ([browser, count]) => (
                        <div
                          key={browser}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                        >
                          <span className="text-gray-300">{browser}</span>
                          <Badge variant="purple">{count}</Badge>
                        </div>
                      )
                    )
                  )}
                </div>
              </Card>
            </div>

            {/* Recent Visitors */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaUsers className="text-cyan-400" />
                Recent Visitors
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        Time
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        Page
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        Browser
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        OS
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                        Device
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-400">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      stats?.recentVisitors.slice(0, 10).map((visitor, index) => (
                        <tr
                          key={index}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-300 text-sm">
                            {formatTime(visitor.timestamp)}
                          </td>
                          <td className="py-3 px-4 text-gray-300 capitalize">
                            {visitor.page}
                          </td>
                          <td className="py-3 px-4 text-gray-400">
                            {visitor.browser}
                          </td>
                          <td className="py-3 px-4 text-gray-400">
                            {visitor.os}
                          </td>
                          <td className="py-3 px-4">
                            {visitor.device === 'desktop' ? (
                              <FaDesktop className="text-cyan-400" />
                            ) : visitor.device === 'mobile' ? (
                              <FaMobile className="text-green-400" />
                            ) : (
                              <FaTablet className="text-yellow-400" />
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'links' && (
          <Card className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-6">
              Social Links Configuration
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaGithub className="inline mr-2" />
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={socialLinks.github}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, github: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <SiTryhackme className="inline mr-2" />
                  TryHackMe URL
                </label>
                <input
                  type="url"
                  value={socialLinks.tryhackme}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, tryhackme: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaLink className="inline mr-2" />
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={socialLinks.linkedin}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaLink className="inline mr-2" />
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={socialLinks.twitter}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, twitter: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaEnvelope className="inline mr-2" />
                  Email URL
                </label>
                <input
                  type="url"
                  value={socialLinks.email}
                  onChange={(e) =>
                    setSocialLinks({ ...socialLinks, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
                />
              </div>

              {saveMessage && (
                <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                  {saveMessage}
                </div>
              )}

              <Button
                onClick={handleSaveLinks}
                isLoading={isSaving}
                leftIcon={<FaSave />}
                className="w-full"
              >
                Save Changes
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'security' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Password Change Card */}
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <FaKey className="text-pink-400" />
                Change Password
              </h3>

              <form onSubmit={handlePasswordChange} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaLock className="inline mr-2" />
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaLock className="inline mr-2" />
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    required
                    minLength={8}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
                    placeholder="Enter new password (min 8 characters)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaLock className="inline mr-2" />
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
                    placeholder="Confirm new password"
                  />
                </div>

                {passwordMessage && (
                  <div
                    className={`p-3 rounded-lg border text-sm flex items-center gap-2 ${
                      passwordMessage.type === 'success'
                        ? 'bg-green-500/20 border-green-500/30 text-green-400'
                        : 'bg-red-500/20 border-red-500/30 text-red-400'
                    }`}
                  >
                    {passwordMessage.type === 'success' ? (
                      <FaCheckCircle />
                    ) : (
                      <FaExclamationCircle />
                    )}
                    {passwordMessage.text}
                  </div>
                )}

                {newHash && (
                  <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm">
                    <p className="font-medium mb-2">Important: Save this hash to your .env file!</p>
                    <code className="block bg-black/30 p-2 rounded text-xs break-all">
                      ADMIN_PASSWORD_HASH={newHash}
                    </code>
                    <p className="mt-2 text-xs">
                      Copy this hash and add it to your .env file to persist the password change.
                      The change will take effect after restarting the server.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  isLoading={isChangingPassword}
                  leftIcon={<FaKey />}
                  className="w-full"
                >
                  Change Password
                </Button>
              </form>
            </Card>

            {/* Security Info */}
            <Card hover={false}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaLock className="text-cyan-400" />
                Security Information
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <p>
                  • Your password is hashed using bcrypt with a salt round of 12
                </p>
                <p>
                  • Only authenticated administrators can access this page
                </p>
                <p>
                  • Session tokens are secured with JWT and stored in HTTP-only cookies
                </p>
                <p>
                  • The admin dashboard is protected by middleware authentication
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
