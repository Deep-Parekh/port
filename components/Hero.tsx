'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Download } from 'lucide-react';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.content}`}>
                <motion.span
                    className={styles.greeting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Hello, I'm Deep
                </motion.span>

                <motion.h1
                    className={styles.headline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Software Engineer <br />
                    <span className="gradient-text">Specializing in ML & Web</span>
                </motion.h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Software Engineer with 4+ years of experience building scalable systems.
                    <br />M.S. in AI candidate at SJSU.
                </motion.p>

                <motion.div
                    className={styles.actions}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link href="/#projects" className={styles.primaryBtn}>
                        View Projects <ArrowRight size={18} />
                    </Link>
                    <a href="https://www.github.com/Deep-Parekh" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/deepparekh" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                        <Linkedin size={20} />
                    </a>
                    {/* <a href="/resume.pdf" className={styles.secondaryBtn} title="Download Resume">
                        <Download size={20} />
                    </a> */}
                </motion.div>
            </div>
        </section>
    );
}
