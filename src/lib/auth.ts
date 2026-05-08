import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import type { AuthSession } from '@/types';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback-secret-key-change-in-production'
);

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || '86400000');

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a JWT session token
 */
export async function createSession(userId: string, email: string): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE);

  const token = await new SignJWT({
    userId,
    email,
    type: 'session',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .setSubject(userId)
    .sign(SECRET_KEY);

  return token;
}

/**
 * Verify and decode a JWT session token
 */
export async function verifySession(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    return {
      userId: payload.sub || '',
      email: (payload as unknown as AuthSession).email || '',
      expiresAt: payload.exp ? new Date(payload.exp * 1000).toISOString() : '',
    };
  } catch {
    return null;
  }
}

/**
 * Get the current session from cookies
 */
export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  return verifySession(token);
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE / 1000,
    path: '/',
  });
}

/**
 * Delete session cookie (logout)
 */
export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Validate admin credentials
 * In production, this would check against a database
 */
export async function validateAdminCredentials(
  email: string,
  password: string
): Promise<{ valid: boolean; userId?: string }> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    // For development: allow default credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      return { valid: true, userId: 'admin' };
    }
    return { valid: false };
  }

  if (email !== adminEmail) {
    return { valid: false };
  }

  const isValid = await comparePassword(password, adminPasswordHash);
  return { valid: isValid, userId: isValid ? 'admin' : undefined };
}

/**
 * Simple rate limiter
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 900000 // 15 minutes
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxAttempts - 1, resetTime: now + windowMs };
  }

  if (record.count >= maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}