import React from 'react';
import styles from './HealthAgent.module.css';

// Minimal, dependency-free renderer for the subset the agent emits: ###
// headings, **bold**, `code`, bullet (- / *) and numbered (1.) lists, and
// blank-line-separated paragraphs. No dangerouslySetInnerHTML — no XSS surface.

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Split on **bold** and `code`, keeping delimiters.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith('**') && part.endsWith('**')) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{part.slice(2, -2)}</strong>);
    } else if (part.startsWith('`') && part.endsWith('`')) {
      nodes.push(
        <code key={`${keyPrefix}-c${i}`} className={styles.inlineCode}>
          {part.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(<React.Fragment key={`${keyPrefix}-t${i}`}>{part}</React.Fragment>);
    }
  });
  return nodes;
}

export default function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let para: string[] = [];
  let key = 0;

  const flushList = () => {
    if (!list) return;
    const items = list.items.map((it, i) => <li key={i}>{renderInline(it, `li${key}-${i}`)}</li>);
    blocks.push(
      list.ordered ? (
        <ol key={key++} className={styles.mdList}>{items}</ol>
      ) : (
        <ul key={key++} className={styles.mdList}>{items}</ul>
      ),
    );
    list = null;
  };
  const flushPara = () => {
    if (!para.length) return;
    blocks.push(
      <p key={key++} className={styles.mdP}>{renderInline(para.join(' '), `p${key}`)}</p>,
    );
    para = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    const bullet = /^\s*[-*]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+\.\s+(.*)$/.exec(line);

    if (heading) {
      flushPara(); flushList();
      blocks.push(
        <div key={key++} className={styles.mdHeading}>{renderInline(heading[2], `h${key}`)}</div>,
      );
    } else if (bullet) {
      flushPara();
      if (!list || list.ordered) { flushList(); list = { ordered: false, items: [] }; }
      list.items.push(bullet[1]);
    } else if (numbered) {
      flushPara();
      if (!list || !list.ordered) { flushList(); list = { ordered: true, items: [] }; }
      list.items.push(numbered[1]);
    } else if (!line.trim()) {
      flushPara(); flushList();
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara(); flushList();

  return <div className={styles.md}>{blocks}</div>;
}
