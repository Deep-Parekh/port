import type { ReactNode } from 'react';

// Small label above section titles: reads as a code comment in dark mode
// ("// skills.json") and a soccer label in light mode ("The Squad" with an
// icon). When a light-mode icon is provided it replaces the default dot.
export default function SectionEyebrow({
    dark,
    light,
    icon,
}: {
    dark: string;
    light: string;
    icon?: ReactNode;
}) {
    return (
        <span className={`section-eyebrow${icon ? ' with-icon' : ''}`}>
            <span className="dark-only">{'// '}{dark}</span>
            <span className="light-only">
                {icon}
                {light}
            </span>
        </span>
    );
}
