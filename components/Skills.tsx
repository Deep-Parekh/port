'use client';

import { motion } from 'framer-motion';
import { Code2, Terminal, Database, Layout } from 'lucide-react';
import styles from './Skills.module.css';

const skillCategories = [
    {
        title: 'Languages',
        icon: <Code2 size={20} className="text-blue-500" />,
        skills: ['JavaScript (React)', 'Python', 'HTML/CSS/SCSS', 'SQL', 'C#', '.NET Framework']
    },
    {
        title: 'AI & Machine Learning',
        icon: <Database size={20} className="text-yellow-500" />,
        skills: ['TensorFlow', 'PyTorch', 'Keras', 'Ollama', 'RAG', 'NLP', 'Computer Vision']
    },
    {
        title: 'Frameworks & Libraries',
        icon: <Layout size={20} className="text-purple-500" />,
        skills: ['React', 'Next.js', 'PyTorch', 'Requests', 'BeautifulSoup']
    },
    {
        title: 'Data & Tools',
        icon: <Terminal size={20} className="text-green-500" />, // Swapped icon for variety
        skills: ['REST APIs', 'Google Maps API', 'BigQuery', 'Looker', 'Web Scraping', 'Data Modeling']
    },
    {
        title: 'Systems & Cloud',
        icon: <Terminal size={20} className="text-green-500" />,
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
