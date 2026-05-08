'use client';

import { useEffect, useCallback } from 'react';

export function useVisitorTracking() {
  const trackPageVisit = useCallback(async (page: string) => {
    try {
      await fetch('/api/visitor/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page }),
      });
    } catch (error) {
      // Silently fail - tracking is not critical
      console.error('Failed to track page visit:', error);
    }
  }, []);

  // Track page views on mount
  useEffect(() => {
    const currentPage = window.location.pathname.replace('/', '') || 'home';
    trackPageVisit(currentPage);

    // Track hash changes for single page navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      trackPageVisit(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [trackPageVisit]);

  return { trackPageVisit };
}