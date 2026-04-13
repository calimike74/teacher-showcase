import { NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// In-memory rate-limit store (per serverless instance — good enough for a
// small site; resets on cold start / redeploy).
// ---------------------------------------------------------------------------
const rateLimitStore = new Map();

function isRateLimited(key, limit, windowMs) {
    const now = Date.now();
    const record = rateLimitStore.get(key);

    if (!record || now > record.resetAt) {
        rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
        return false;
    }

    record.count++;
    return record.count > limit;
}

// Tidy up expired entries every ~100 requests
function cleanupStore() {
    const now = Date.now();
    for (const [key, record] of rateLimitStore) {
        if (now > record.resetAt) rateLimitStore.delete(key);
    }
}

// ---------------------------------------------------------------------------
export function middleware(request) {
    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        'unknown';
    const path = request.nextUrl.pathname;

    if (Math.random() < 0.01) cleanupStore();

    // General API rate limit — 60 requests / minute / IP
    if (path.startsWith('/api/')) {
        if (isRateLimited(`api:${ip}`, 60, 60_000)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 },
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
