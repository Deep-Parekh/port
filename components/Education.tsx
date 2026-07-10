'use client';

import { motion } from 'framer-motion';
import SectionEyebrow from '@/components/SectionEyebrow';
import { ConeIcon } from '@/components/SoccerIcons';
import styles from './Education.module.css';

const education = [
    {
        degree: 'Master of Science in Artificial Intelligence',
        university: 'San Jose State University',
        period: '2024 - 2026',
        description: 'Relevant coursework: Machine Learning, Deep Learning, NLP, Distributed Systems.'
    },
    {
        degree: 'Bachelor of Science in Computer Science',
        university: 'California State Polytechnic University, Pomona',
        period: '2017 - 2021',
        description: 'Minor in Entrepreneurship. Dean\'s List. Relevant coursework: Data Structures, Algorithms, Operating Systems, Database Systems, Web Development.'
    }
];

export default function Education() {
    return (
        <section className={styles.section} id="education">
            <div className="container">
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <SectionEyebrow dark="education.md" light="Training Ground" icon={<ConeIcon />} />
                    Academic <span className="gradient-text">Background</span>
                </motion.h2>

                <div className={styles.timeline}>
                    {education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            className={styles.item}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className={styles.card}>
                                <h3 className={styles.degree}>{edu.degree}</h3>
                                <span className={styles.university}>{edu.university}</span>
                                <span className={styles.period}>{edu.period}</span>
                                <p className={styles.description}>{edu.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
