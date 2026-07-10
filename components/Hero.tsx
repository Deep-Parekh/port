'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Download } from 'lucide-react';
import Link from 'next/link';
import styles from './Hero.module.css';
import { CornerFlagIcon } from '@/components/SoccerIcons';

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Light mode: faint chalk pitch markings */}
            <div className={`${styles.pitchLines} light-only`} aria-hidden="true">
                <span className={styles.halfwayLine} />
                <span className={styles.centerCircle} />
                <span className={styles.centerSpot} />
                <span className={styles.cornerArc} />
                <CornerFlagIcon size={54} className={styles.cornerFlag} />
            </div>

            <div className={`container ${styles.content}`}>
                <motion.span
                    className={styles.greeting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className={`${styles.greetingDark} dark-only`}>{"// Hello, I'm Deep"}</span>
                    <span className={`${styles.greetingLight} light-only`}>Kickoff — Hello, I&apos;m Deep</span>
                </motion.span>

                <motion.h1
                    className={styles.headline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Software Engineer <br />
                    <span className="gradient-text">Specializing in ML &amp; Web</span>
                    <span className={`${styles.cursor} dark-only`} aria-hidden="true" />
                </motion.h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Development lead who owns delivery end-to-end — turning ambiguous,
                    customer-facing problems into shipped software, from discovery to production.
                    <br />Now building LLM agents while finishing my M.S. in Artificial Intelligence at SJSU.
                </motion.p>

                <motion.div
                    className={styles.actions}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link href="/#projects" className={styles.primaryBtn}>
                        <span className={`${styles.btnDark} dark-only`}>view --projects</span>
                        <span className="light-only">View Projects</span>
                        <ArrowRight size={18} />
                    </Link>
                    <a href="https://www.github.com/Deep-Parekh" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/deepparekh/" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn} aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeBtn}>
                        <Download size={18} />
                        <span className={`${styles.btnDark} dark-only`}>curl -L resume.pdf</span>
                        <span className="light-only">Resume</span>
                    </a>
                </motion.div>
            </div>

            {/* Dark mode: editor status bar */}
            <div className={`${styles.statusBar} dark-only`} aria-hidden="true">
                <span className={styles.statusGit}>⎇ main</span>
                <span>TypeScript</span>
                <span className={styles.statusExtra}>UTF-8</span>
                <span className={styles.statusRight}>Ln 1, Col 1</span>
            </div>
        </section>
    );
}
