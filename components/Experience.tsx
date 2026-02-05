'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const experiences = [
    {
        role: 'Software Engineer',
        company: 'Sun Net Inc.',
        period: 'July 2021 - Present',
        description: 'Architected a central entity linking system decoupled from 5 legacy modules, increasing platform modularity. Designed workflows saving customers 80%+ time. Led end-to-end development of REST APIs and React frontends. Mentored junior engineers.'
    },
    {
        role: 'Application Developer Intern',
        company: 'Commonwealth Care Alliance',
        period: 'May 2019 - May 2021',
        description: 'Designed Provider Directory backend using .NET and Google Maps API. Built data pipelines to load cybersecurity data into BigQuery. Created executive Looker dashboards for security visualization.'
    }
];

export default function Experience() {
    return (
        <section className={styles.section} id="experience">
            <div className="container">
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Professional <span className="gradient-text">Journey</span>
                </motion.h2>

                <div className={styles.timeline}>
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            className={styles.item}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className={styles.card}>
                                <h3 className={styles.role}>{exp.role}</h3>
                                <span className={styles.company}>{exp.company}</span>
                                <span className={styles.period}>{exp.period}</span>
                                <p className={styles.description}>{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
