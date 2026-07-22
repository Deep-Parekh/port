import type { Metadata } from 'next';
import Console from '@/components/health-agent/Console';
import styles from '@/components/health-agent/HealthAgent.module.css';

export const metadata: Metadata = {
  title: 'HealthVA — Diet & Workout Agent | Deep Parekh',
  description:
    'A routed diet + workout agent with grounded tool calls, safety guardrails, and per-user memory. Live demo.',
};

export default function HealthAgentPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.pageHead}>
          <span className="section-eyebrow">
            <span className="dark-only">{'// live agent demo'}</span>
            <span className="light-only">Live agent demo</span>
          </span>
          <h1 className={styles.pageTitle}>HealthVA</h1>
          <p className={styles.pageSub}>
            Ask for a workout plan or a meal idea. Each turn is routed to a domain
            specialist, every plan is grounded in a real exercise database, and your
            profile is remembered across visits. Not medical advice.
          </p>
        </header>
        <Console />
      </div>
    </div>
  );
}
