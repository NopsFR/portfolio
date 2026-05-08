import { NextRequest, NextResponse } from 'next/server';
import { hash, compare } from 'bcryptjs';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback-secret-key-change-in-production'
);

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('admin_session')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify the token
    try {
      await jwtVerify(token, SECRET_KEY);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Parse request body
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Verify current password
    const currentHash = process.env.ADMIN_PASSWORD_HASH;
    if (!currentHash) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const isValid = await compare(currentPassword, currentHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash the new password
    const newHash = await hash(newPassword, 12);

    // In a production environment, you would save this to a database
    // For now, we'll return the hash to be saved in the .env file
    return NextResponse.json({
      success: true,
      message: 'Password changed successfully',
      newHash: newHash,
      instructions: 'Save this hash to your .env file as ADMIN_PASSWORD_HASH to persist the change.'
    });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}