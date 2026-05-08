import { NextRequest, NextResponse } from 'next/server';

// In-memory store for visitor data (in production, use a database)
const visitorData = {
  totalVisits: 0,
  pageViews: {} as Record<string, number>,
  recentVisitors: [] as Array<{
    timestamp: string;
    page: string;
    browser: string;
    os: string;
    device: string;
  }>,
  deviceStats: {
    desktop: 0,
    mobile: 0,
    tablet: 0,
  },
  browserStats: {} as Record<string, number>,
};

function getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
  if (/tablet/i.test(userAgent)) return 'tablet';
  if (/mobile/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

function getBrowserName(userAgent: string): string {
  if (/chrome/i.test(userAgent)) return 'Chrome';
  if (/firefox/i.test(userAgent)) return 'Firefox';
  if (/safari/i.test(userAgent)) return 'Safari';
  if (/edge/i.test(userAgent)) return 'Edge';
  return 'Other';
}

function getOSName(userAgent: string): string {
  if (/windows/i.test(userAgent)) return 'Windows';
  if (/mac/i.test(userAgent)) return 'macOS';
  if (/linux/i.test(userAgent)) return 'Linux';
  if (/android/i.test(userAgent)) return 'Android';
  if (/ios/i.test(userAgent)) return 'iOS';
  return 'Other';
}

export async function POST(request: NextRequest) {
  try {
    const { page } = await request.json();
    const userAgent = request.headers.get('user-agent') || '';

    const deviceType = getDeviceType(userAgent);
    const browser = getBrowserName(userAgent);
    const os = getOSName(userAgent);

    // Update stats
    visitorData.totalVisits++;
    visitorData.pageViews[page] = (visitorData.pageViews[page] || 0) + 1;
    visitorData.deviceStats[deviceType]++;
    visitorData.browserStats[browser] = (visitorData.browserStats[browser] || 0) + 1;

    // Add to recent visitors (keep last 50)
    visitorData.recentVisitors.unshift({
      timestamp: new Date().toISOString(),
      page,
      browser,
      os,
      device: deviceType,
    });

    if (visitorData.recentVisitors.length > 50) {
      visitorData.recentVisitors = visitorData.recentVisitors.slice(0, 50);
    }

    return NextResponse.json({
      success: true,
      message: 'Visit tracked',
    });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: visitorData,
    });
  } catch (error) {
    console.error('Get visitor stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get stats' },
      { status: 500 }
    );
  }
}