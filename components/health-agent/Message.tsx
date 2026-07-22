import type { UiMessage } from '@/app/health-agent/types';
import Markdown from './Markdown';
import ActivityChip from './ActivityChip';
import styles from './HealthAgent.module.css';

export default function Message({ msg }: { msg: UiMessage }) {
  if (msg.role === 'user') {
    return (
      <div className={`${styles.msg} ${styles.user}`}>
        <span className={styles.who}>you</span>
        <div className={styles.bubble}>{msg.content}</div>
      </div>
    );
  }

  return (
    <div className={`${styles.msg} ${styles.assistant}`}>
      <span className={styles.who}>HealthVA</span>
      {msg.content && (
        <div className={`${styles.bubble} ${msg.error ? styles.errorBubble : ''}`}>
          <Markdown text={msg.content} />
        </div>
      )}
      <ActivityChip msg={msg} />
    </div>
  );
}
