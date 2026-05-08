import { NextResponse } from 'next/server';

// GitHub username from personalInfo
const GITHUB_USERNAME = 'NopsFR';
const GITHUB_BASE_URL = 'https://api.github.com';

// Cache for GitHub data
let cachedData: { repos: unknown[]; user: unknown; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    // Check cache
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
      });
    }

    // Fetch from GitHub API
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`${GITHUB_BASE_URL}/users/${GITHUB_USERNAME}`),
      fetch(
        `${GITHUB_BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`
      ),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const user = await userResponse.json();
    const repos = await reposResponse.json();

    // Process repos to include language stats
    const reposWithLanguages = await Promise.all(
      repos.map(async (repo: { languages_url: string; [key: string]: unknown }) => {
        try {
          const langResponse = await fetch(repo.languages_url);
          const languages = await langResponse.json();
          return { ...repo, languages };
        } catch {
          return { ...repo, languages: {} };
        }
      })
    );

    const data = { repos: reposWithLanguages, user };
    cachedData = { ...data, timestamp: Date.now() };

    return NextResponse.json({
      success: true,
      data,
      cached: false,
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch GitHub data',
        fallback: {
          profileUrl: `https://github.com/${GITHUB_USERNAME}`,
        },
      },
      { status: 500 }
    );
  }
}
