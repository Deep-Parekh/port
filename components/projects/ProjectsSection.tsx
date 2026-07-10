'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import { SoccerBallIcon } from '@/components/SoccerIcons';
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
                    <SectionEyebrow dark="projects/" light="Highlights" icon={<SoccerBallIcon />} />
                    Featured <span className="gradient-text">Projects</span>
                </motion.h2>

                {/* Project 1: HealthVA */}
                <motion.div
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.projectContent}>
                        <h3 className={styles.projectTitle}>HealthVA — Multi-Agent Health Assistant</h3>
                        <div className={styles.projectTags}>
                            <span className={styles.tag}>Python</span>
                            <span className={styles.tag}>LangGraph</span>
                            <span className={styles.tag}>Postgres RLS</span>
                            <span className={styles.tag}>Guardrail Evals</span>
                            <span className={styles.tag}>Local LLM</span>
                        </div>
                        <p className={styles.projectDesc}>
                            A health assistant that routes each message to the right specialist — diet, workout, or general — so the model
                            only sees the tools and instructions it needs for that turn. User profiles persist across sessions.
                            <br /><br />
                            Safety is built into the system, not left to the model: answers must be backed by real tool calls or they get retried,
                            every decision is logged, and an injury guardrail passed a published evaluation with zero unsafe exercises across 5,757 prescribed.
                            <br /><br />
                            User data stays protected — no personal identifiers are stored, and each session can only touch its own user&apos;s data,
                            enforced both in code and in the database. Runs on cloud models or fully local ones via Ollama.
                        </p>
                        <div className={styles.links}>
                            <a href="https://github.com/Deep-Parekh/health_agent" className={styles.linkBtn} target="_blank" rel="noopener noreferrer">
                                <Github size={18} /> View Code
                            </a>
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

                {/* Project 3: Diet Agent */}
                <motion.div
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
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
                            Its diet capabilities were later folded into HealthVA above.
                        </p>
                        <div className={styles.links}>
                            <a href="https://github.com/Deep-Parekh/diet_agent" className={styles.linkBtn} target="_blank" rel="noopener noreferrer">
                                <Github size={18} /> View Code
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Project 4: Sorting Visualizer */}
                {/* <motion.div
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
                        </div>
                    </div>
                </motion.div> */}

            </div>
        </section>
    );
}
