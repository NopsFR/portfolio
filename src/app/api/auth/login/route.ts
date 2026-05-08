import { NextRequest, NextResponse } from 'next/server';
import {
  validateAdminCredentials,
  createSession,
  setSessionCookie,
  checkRateLimit,
  sanitizeInput,
  isValidEmail,
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sanitize email
    const sanitizedEmail = sanitizeInput(email.trim().toLowerCase());

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check rate limit
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(clientIP, 5, 900000); // 5 attempts per 15 minutes

    if (!rateLimit.allowed) {
      const waitTime = Math.ceil((rateLimit.resetTime - Date.now()) / 60000);
      return NextResponse.json(
        {
          success: false,
          error: 'Too many login attempts. Please try again later.',
          retryAfter: waitTime,
        },
        { status: 429 }
      );
    }

    // Validate credentials
    const { valid, userId } = await validateAdminCredentials(sanitizedEmail, password);

    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session
    const token = await createSession(userId!, sanitizedEmail);

    // Set session cookie
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        email: sanitizedEmail,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}