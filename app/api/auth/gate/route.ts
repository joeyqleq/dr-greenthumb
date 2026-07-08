import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const EXPECTED_HASH = crypto.createHash('sha256').update('robotics1337').digest('hex');

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    if (hash === EXPECTED_HASH) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
