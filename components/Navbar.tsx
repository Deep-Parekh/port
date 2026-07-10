'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal } from 'lucide-react';
import styles from './Navbar.module.css';
import { SoccerBallIcon } from '@/components/SoccerIcons';
import { useTheme } from '@/context/ThemeContext';

const navItems = [
    { name: 'Home', file: 'home.tsx', path: '/' },
    { name: 'Projects', file: 'projects.tsx', path: '/#projects' },
    { name: 'Schedule', file: 'schedule.md', path: '/schedule' },
];

export default function Navbar() {
    const { toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll(); // Check on mount
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [menuOpen]);

    return (
        <nav className={`${styles.navbar} ${isScrolled || menuOpen ? styles.scrolled : ''}`}>
            <div className={`container ${styles.content}`}>
                <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
                    <span className={`${styles.logoDark} dark-only`}>
                        <span className={styles.logoPrompt}>~/</span>deep
                    </span>
                    <span className={`${styles.logoLight} light-only`}>
                        <span className={styles.logoSpot} />Deep Parekh
                    </span>
                </Link>

                <div className={styles.navLinks}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
                        >
                            <span className={`${styles.linkDark} dark-only`}>{item.file}</span>
                            <span className="light-only">{item.name}</span>
                        </Link>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button
                        onClick={toggleTheme}
                        className={styles.themeToggle}
                        aria-label="Switch between light and dark theme"
                        title="Toggle light / dark"
                    >
                        {/* Sliding pill: the knob's side reads as light vs dark at a glance.
                            CSS keys off html[data-theme], so the markup is identical on
                            server and client (no hydration branch on theme). */}
                        <span className={styles.track}>
                            <SoccerBallIcon size={15} className={styles.ballIcon} aria-hidden="true" />
                            <Terminal size={14} className={styles.codeIcon} aria-hidden="true" />
                            <span className={styles.knob} aria-hidden="true" />
                        </span>
                    </button>

                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className={styles.mobileMenu}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.mobileLink} ${pathname === item.path ? styles.mobileActive : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className={`${styles.linkDark} dark-only`}>{item.file}</span>
                            <span className="light-only">{item.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
