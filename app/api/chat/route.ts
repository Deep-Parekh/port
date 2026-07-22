import { NextRequest, NextResponse } from 'next/server';

// Server-side proxy to the HealthVA agent on Modal. The Modal URL and the
// shared secret stay here (never shipped to the browser); the client only ever
// calls same-origin /api/chat.
export const runtime = 'nodejs';
// A cold Modal container + a multi-tool agent turn can take tens of seconds;
// Vercel Hobby defaults to 10s and would 504 (returning HTML, which the client
// then can't parse — surfacing as a "network error"). 60s is the Hobby max.
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const base = process.env.AGENT_API_URL;
  const secret = process.env.AGENT_API_SECRET;

  if (!base) {
    return NextResponse.json(
      { error: 'Agent not configured', detail: 'AGENT_API_URL is not set.' },
      { status: 500 },
    );
  }

  let body: { username?: string; message?: string; history?: [string, string][] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.username?.trim() || !body.message?.trim()) {
    return NextResponse.json(
      { error: 'username and message are required' },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${base.replace(/\/$/, '')}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(secret ? { 'X-API-Key': secret } : {}),
      },
      body: JSON.stringify({
        username: body.username,
        message: body.message,
        history: body.history ?? [],
      }),
      // Stay under maxDuration so we return clean JSON before Vercel kills the
      // function with an (unparseable) HTML 504.
      signal: AbortSignal.timeout(55_000),
    });

    const data = await upstream.json().catch(() => ({ error: 'Bad response from agent' }));
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    const cold = err instanceof Error && err.name === 'TimeoutError';
    return NextResponse.json(
      {
        error: cold ? 'Agent timed out (it may be waking up — try again)' : 'Agent unreachable',
      },
      { status: 502 },
    );
  }
}
