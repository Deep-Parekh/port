'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import styles from './ProjectsSection.module.css';
import SortingVisualizer from './SortingVisualizer';

export default function ProjectsSection() {
    return (
        <section className={styles.section} id="projects">
            <div className="container">
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Featured <span className="gradient-text">Projects</span>
                </motion.h2>

                {/* Project 1: Diet Agent */}
                <motion.div
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.projectContent}>
                        <h3 className={styles.projectTitle}>Diet Planning Agent</h3>
                        <div className={styles.projectTags}>
                            <span className={styles.tag}>Python</span>
                            <span className={styles.tag}>LangGraph</span>
                            <span className={styles.tag}>SQLite</span>
                            <span className={styles.tag}>Local LLM</span>
                        </div>
                        <p className={styles.projectDesc}>
                            A conversational diet-planning agent running completely locally using LangChain + LangGraph.
                            Features include BMR/TDEE calculation, food lookup via local FoodData Central, and recipe search over a local SQLite database.
                            <br /><br />
                            Designed with safety guardrails and tool-calling capabilities to provide grounded nutritional advice without external dependencies.
                        </p>
                        <div className={styles.links}>
                            <a href="https://github.com/Deep-Parekh/diet_agent" className={styles.linkBtn} target="_blank" rel="noopener noreferrer">
                                <Github size={18} /> View Code
                            </a>
                            {/* <a href="#" className={styles.linkBtn}>
                                <ExternalLink size={18} /> Case Study
                            </a> */}
                        </div>
                    </div>
                </motion.div>

                {/* Project 2: Provider Directory */}
                <motion.div
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className={styles.projectContent}>
                        <h3 className={styles.projectTitle}>Provider Directory</h3>
                        <div className={styles.projectTags}>
                            <span className={styles.tag}>.NET Core</span>
                            <span className={styles.tag}>Google Maps API</span>
                            <span className={styles.tag}>SQL</span>
                        </div>
                        <p className={styles.projectDesc}>
                            Designed and built the backend for Commonwealth Care Alliance's provider search tool.
                            <br />
                            Integrated Google Maps API for geolocation-based search and optimized SQL queries to handle thousands of provider records with low latency.
                        </p>
                        <div className={styles.links}>
                            <a href="https://www.commonwealthcarealliance.org/ma/members/find-a-provider/" target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                                <ExternalLink size={18} /> Live Site
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Project 3: Sorting Visualizer */}
                <motion.div
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={styles.demoArea}>
                        <SortingVisualizer />
                    </div>
                    <div className={styles.projectContent}>
                        <h3 className={styles.projectTitle}>Sorting Algorithm Visualizer</h3>
                        <div className={styles.projectTags}>
                            <span className={styles.tag}>React</span>
                            <span className={styles.tag}>Algorithms</span>
                            <span className={styles.tag}>Interactive</span>
                        </div>
                        <p className={styles.projectDesc}>
                            A web-based tool to visualize classic sorting algorithms in real-time.
                            Built to demonstrate understanding of DSA concepts and state management in React.
                            <br /><br />
                            The interactive demo allows users to generate random datasets and watch the sorting process step-by-step.
                        </p>
                        <div className={styles.links}>
                            {/* <a href="#" className={styles.linkBtn}>
                                <Github size={18} /> View Code
                            </a>
                            <a href="#" className={styles.linkBtn}>
                                <ExternalLink size={18} /> Live Demo
                            </a> */}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
