import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const EXPECTED_HASH = crypto.createHash('sha256').update('robotics1337').digest('hex');

// Rate limiting: simple in-memory store (resets on deploy)
const attempts = new Map<string, { count: number; reset: number }>();

function getRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.reset) {
    attempts.set(ip, { count: 1, reset: now + 60000 });
    return true;
  }

  if (record.count >= 5) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    if (!getRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, message: 'lmao nice try. enjoy your timeout.' },
        { status: 429 }
      );
    }

    const { password } = await request.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    if (hash === EXPECTED_HASH) {
      const response = NextResponse.json({ ok: true });
      response.cookies.set('dgt.auth', 'authorized', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 86400 * 365,
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

