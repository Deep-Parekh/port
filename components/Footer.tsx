'use client';

import { Mail, Github, Linkedin, FileText } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import { WhistleIcon } from '@/components/SoccerIcons';
import styles from './Footer.module.css';

const EMAIL = 'dnparekh1011@gmail.com';

export default function Footer() {
    return (
        <footer className={styles.footer} id="contact">
            <div className="container">
                <SectionEyebrow dark="let's connect" light="Full Time" icon={<WhistleIcon />} />

                <h2 className={styles.heading}>
                    Open to Senior SWE &amp; ML/AI roles
                </h2>

                <p className={styles.teamNote}>
                    <span className={`${styles.mono} dark-only`}>
                        {'// lifelong soccer player — team-first, on the pitch and in the office'}
                    </span>
                    <span className="light-only">
                        Lifelong soccer player — I bring the same team-first instinct, communication
                        under pressure, and discipline to every engineering team I join.
                    </span>
                </p>

                <p className={styles.blurb}>
                    The fastest way to reach me is by email or&nbsp;
                    <a href="/schedule" className={styles.scheduleLink}>
                        set up a quick meeting with me
                    </a>.
                </p>

                <div className={styles.links}>
                    <a href={`mailto:${EMAIL}`} className={styles.primaryLink}>
                        <Mail size={18} />
                        <span className={`${styles.mono} dark-only`}>{EMAIL}</span>
                        <span className="light-only">{EMAIL}</span>
                    </a>
                    <a href="https://www.linkedin.com/in/deepparekh/" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="LinkedIn">
                        <Linkedin size={18} />
                    </a>
                    <a href="https://www.github.com/Deep-Parekh" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub">
                        <Github size={18} />
                    </a>
                    <a href="/deep_parekh_resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Résumé">
                        <FileText size={18} />
                    </a>
                </div>

                <div className={styles.baseline}>
                    <span className={`${styles.mono} dark-only`}>{'// © 2026 Deep Parekh — built with Next.js'}</span>
                    <span className="light-only">© 2026 Deep Parekh</span>
                </div>
            </div>
        </footer>
    );
}
