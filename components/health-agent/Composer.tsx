'use client';

import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import styles from './HealthAgent.module.css';

const SUGGESTED = [
  'Plan my training week',
  "I have a torn ACL — what can I train?",
  'High-protein vegetarian dinner',
  'Everything except a barbell — push day',
];

export default function Composer({
  onSend,
  disabled,
  showSuggestions,
}: {
  onSend: (message: string) => void;
  disabled: boolean;
  showSuggestions: boolean;
}) {
  const [value, setValue] = useState('');

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || disabled) return;
    onSend(t);
    setValue('');
  };

  return (
    <div className={styles.composer}>
      {showSuggestions && (
        <div className={styles.suggested}>
          {SUGGESTED.map((s) => (
            <button key={s} type="button" onClick={() => submit(s)} disabled={disabled}>
              {s}
            </button>
          ))}
        </div>
      )}
      <form
        className={styles.inputrow}
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
      >
        <input
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask about workouts, meals, or both…"
          aria-label="Message"
          disabled={disabled}
        />
        <button className={styles.send} type="submit" disabled={disabled || !value.trim()} aria-label="Send">
          <SendHorizontal size={16} />
        </button>
      </form>
    </div>
  );
}
