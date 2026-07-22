import { NextRequest, NextResponse } from 'next/server';

// Server-side proxy to the HealthVA agent on Modal. The Modal URL and the
// shared secret stay here (never shipped to the browser); the client only ever
// calls same-origin /api/chat.
export const runtime = 'nodejs';

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
      // Modal scales to zero; the first request after idle cold-starts (~seconds).
      signal: AbortSignal.timeout(90_000),
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
