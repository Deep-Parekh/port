'use client';

import { useState } from 'react';
import type { UiMessage, TraceEvent } from '@/app/health-agent/types';
import styles from './HealthAgent.module.css';

const PROFILE_TOOLS = new Set(['get_user_profile', 'update_user_profile']);

type ToolCall = { name: string; input: string; output: string };

function deriveTools(trace: TraceEvent[]): ToolCall[] {
  const tools: ToolCall[] = [];
  let cur: ToolCall | null = null;
  for (const e of trace) {
    if (e.event === 'tool_start') {
      cur = { name: e.tool ?? 'tool', input: e.input ?? '', output: '' };
      tools.push(cur);
    } else if (e.event === 'tool_end' && cur) {
      cur.output = e.output ?? '';
      cur = null;
    }
  }
  return tools;
}

function fmtProfile(v: unknown): string {
  if (Array.isArray(v)) return v.join(', ') || '—';
  return String(v);
}

export default function ActivityChip({ msg }: { msg: UiMessage }) {
  const [open, setOpen] = useState(false);

  // Turn still running: the glyph fills, no detail yet.
  if (msg.pending) {
    return (
      <div className={styles.activity}>
        <span className={styles.workingLine}>
          <span className={`${styles.glyph} ${styles.working}`} aria-hidden="true" />
          working…
        </span>
      </div>
    );
  }

  // Guardrail-blocked / errored turns have no meaningful trace — no chip.
  if (!msg.route || msg.route.startsWith('blocked:') || msg.error) return null;

  const trace = msg.trace ?? [];
  const tools = deriveTools(trace);
  const dataTools = tools.filter((t) => !PROFILE_TOOLS.has(t.name));
  const violated = trace.some((e) => e.event === 'grounding_violation');
  const grounded = dataTools.length > 0 && !violated;
  const profileEntries = Object.entries(msg.profile ?? {});

  return (
    <div className={styles.activity}>
      <button
        className={styles.actChip}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`${styles.glyph} ${styles.done}`} aria-hidden="true" />
        <span className={styles.route}>◆ {msg.route}</span>
        <span className={styles.sep}>·</span>
        <span>{tools.length} tool call{tools.length === 1 ? '' : 's'}</span>
        {violated && (<><span className={styles.sep}>·</span><span className={styles.warn}>ungrounded ⚠</span></>)}
        {grounded && (<><span className={styles.sep}>·</span><span className={styles.grounded}>grounded ✓</span></>)}
        <span className={styles.chev}>›</span>
      </button>

      {open && (
        <div className={styles.actDetail}>
          <div className={`${styles.icard} ${styles.routeCard}`}>
            <div className={styles.ihead}><span className={styles.lbl}>route</span><span className={styles.val}>{msg.route}</span></div>
          </div>

          {tools.map((t, i) => (
            <div key={i} className={`${styles.icard} ${styles.toolCard}`}>
              <div className={styles.ihead}><span className={styles.lbl}>tool</span><span className={styles.val}>{t.name}</span></div>
              {t.input && t.input !== '{}' && (
                <div className={styles.ibody}><span className={styles.k}>args</span> <span className={styles.v}>{t.input}</span></div>
              )}
              {t.output && (
                <div className={styles.ibody}><span className={styles.k}>→</span> {t.output.slice(0, 220)}{t.output.length > 220 ? '…' : ''}</div>
              )}
            </div>
          ))}

          {(grounded || violated) && (
            <div className={`${styles.icard} ${styles.groundCard}`}>
              <div className={styles.ihead}>
                <span className={styles.lbl}>grounding</span>
                <span className={violated ? styles.warn : styles.val}>{violated ? '⚠ unverified' : '✓ from local DB'}</span>
              </div>
            </div>
          )}

          {profileEntries.length > 0 && (
            <div className={`${styles.icard} ${styles.memCard}`}>
              <div className={styles.ihead}><span className={styles.lbl}>memory</span><span className={styles.val}>profile</span></div>
              <div className={styles.chips}>
                {profileEntries.map(([k, v]) => (
                  <span key={k} className={styles.chip}>{k} <b>{fmtProfile(v)}</b></span>
                ))}
              </div>
              <div className={styles.memFoot}>remembered across sessions · isolated per user</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
