'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChatResponse, UiMessage } from '@/app/health-agent/types';
import Message from './Message';
import Composer from './Composer';
import styles from './HealthAgent.module.css';

const STORAGE_KEY = 'healthva-username';

export default function Console() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  // Restore the session name so the profile carries across visits.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setUsername(saved);
  }, []);
  useEffect(() => {
    if (username) localStorage.setItem(STORAGE_KEY, username);
  }, [username]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async (message: string) => {
    if (!username.trim()) return;
    // Stage 1 (instant): echo the user message + a pending assistant turn.
    const history = messages
      .filter((m) => !m.pending)
      .reduce<[string, string][]>((acc, m, i, arr) => {
        if (m.role === 'user' && arr[i + 1]?.role === 'assistant') {
          acc.push([m.content, arr[i + 1].content]);
        }
        return acc;
      }, []);

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: message },
      { role: 'assistant', content: '', pending: true },
    ]);
    setBusy(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), message, history }),
      });
      // A gateway timeout / crash returns HTML, not JSON — parse defensively so
      // the user sees a real reason instead of a generic failure.
      let data: (ChatResponse & { error?: string });
      try {
        data = await res.json();
      } catch {
        data = {
          reply: '', route: '', tool_trace: [], profile: {},
          error:
            res.status === 504 || res.status === 502
              ? 'The agent took too long to respond (it may be waking up). Please try again.'
              : `Unexpected response from the agent (HTTP ${res.status}).`,
        };
      }
      setMessages((prev) => {
        const next = [...prev];
        if (res.ok && !data.error) {
          next[next.length - 1] = {
            role: 'assistant',
            content: data.reply,
            route: data.route,
            trace: data.tool_trace,
            profile: data.profile,
          };
        } else {
          next[next.length - 1] = {
            role: 'assistant',
            content: data.error || 'Something went wrong reaching the agent.',
            error: true,
          };
        }
        return next;
      });
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: 'assistant',
          content: 'Network error — please try again.',
          error: true,
        };
        return next;
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.console}>
      <div className={styles.titlebar}>
        <span className={styles.dots}><i /><i /><i /></span>
        <span className={styles.wordmark}>Health<b>VA</b></span>
        <span className={styles.path}>/health-agent</span>
        <label className={styles.session}>
          <span className={`${styles.live} ${username ? styles.liveOn : ''}`} />
          <input
            className={styles.sessionInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            aria-label="Username (keys your saved profile)"
            spellCheck={false}
          />
        </label>
      </div>

      <div className={styles.thread} ref={threadRef}>
        {messages.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyLead}>A diet &amp; workout agent that routes each question to the right specialist, grounds every plan in a real exercise database, and remembers your profile.</p>
            {!username.trim() && (
              <p className={styles.emptyHint}>Pick a username above to start — it keys your saved profile (a demo session, not real auth).</p>
            )}
          </div>
        )}
        {messages.map((m, i) => (
          <Message key={i} msg={m} />
        ))}
      </div>

      <Composer onSend={send} disabled={busy || !username.trim()} showSuggestions={messages.length === 0} />
    </div>
  );
}
