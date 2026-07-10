'use client';

import { motion } from 'framer-motion';
import { Code2, Terminal, Database, Layout } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import { BootIcon } from '@/components/SoccerIcons';
import styles from './Skills.module.css';

const skillCategories = [
    {
        title: 'Languages',
        icon: <Code2 size={20} />,
        skills: ['JavaScript', 'Python', 'HTML/CSS/SCSS', 'SQL', 'C#', '.NET Framework']
    },
    {
        title: 'AI & Machine Learning',
        icon: <Database size={20} />,
        skills: ['TensorFlow', 'PyTorch', 'Ollama', 'RAG', 'NLP', 'Computer Vision']
    },
    {
        title: 'Frameworks & Libraries',
        icon: <Layout size={20} />,
        skills: ['React', 'Next.js', 'PyTorch', 'Langchain', 'BeautifulSoup']
    },
    {
        title: 'Data & Tools',
        icon: <Terminal size={20} />, // Swapped icon for variety
        skills: ['REST APIs', 'Google Maps API', 'BigQuery', 'Looker', 'Web Scraping', 'Data Modeling']
    },
    {
        title: 'Systems & Cloud',
        icon: <Terminal size={20} />,
        skills: ['Git', 'Docker', 'AWS', 'Linux', 'CI/CD']
    }
];

export default function Skills() {
    return (
        <section className={styles.section} id="skills">
            <div className="container">
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <SectionEyebrow dark="skills.json" light="The Squad" icon={<BootIcon />} />
                    Technical <span className="gradient-text">Skillset</span>
                </motion.h2>

                <div className={styles.grid}>
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            className={styles.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <h3 className={styles.categoryTitle}>
                                {category.icon}
                                {category.title}
                            </h3>
                            <div className={styles.skillList}>
                                {category.skills.map(skill => (
                                    <span key={skill} className={styles.skill}>{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
