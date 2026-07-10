// Line-art soccer icons that match the light theme's chalk-line aesthetic.
// Kept monochrome (currentColor) and lightly filled so they read as soccer
// without the loud referee-yellow that would clash with the muted palette.
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number): SVGProps<SVGSVGElement> {
    return {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
    };
}

// A corner flag: pole with a triangular pennant flying out
export function CornerFlagIcon({ size = 16, ...props }: IconProps) {
    return (
        <svg {...base(size)} {...props}>
            <line x1="6" y1="3" x2="6" y2="21" />
            <path d="M6 3.5 L18 6.5 L6 10 Z" fill="currentColor" stroke="none" />
            <line x1="3" y1="21" x2="10" y2="21" />
        </svg>
    );
}

// Assistant referee (offside) flag: angled pole with a checkered flag
export function OffsideFlagIcon({ size = 16, ...props }: IconProps) {
    return (
        <svg {...base(size)} {...props}>
            <line x1="3.5" y1="21" x2="11.5" y2="6" />
            <rect x="10.5" y="2.5" width="9.5" height="7.5" rx="0.5" />
            <path d="M10.5 2.5 h4.75 v3.75 h-4.75 Z" fill="currentColor" stroke="none" />
            <path d="M15.25 6.25 h4.75 v3.75 h-4.75 Z" fill="currentColor" stroke="none" />
        </svg>
    );
}

// A soccer boot / cleat in side profile, with studs
export function BootIcon({ size = 16, ...props }: IconProps) {
    return (
        <svg {...base(size)} {...props}>
            <path
                d="M3 8 L8.5 8 C9.5 8 9.8 9.6 11.5 9.6 C15.5 9.6 19.5 10.8 20.4 13.6 C20.7 14.6 20 15.4 19 15.4 L4 15.4 C3.4 15.4 3 15 3 14.4 Z"
                fill="currentColor"
                fillOpacity="0.85"
                stroke="none"
            />
            <line x1="7" y1="15.4" x2="7" y2="17.6" />
            <line x1="11.5" y1="15.4" x2="11.5" y2="17.6" />
            <line x1="16" y1="15.4" x2="16" y2="17.6" />
        </svg>
    );
}

// Referee whistle
export function WhistleIcon({ size = 16, ...props }: IconProps) {
    return (
        <svg {...base(size)} {...props}>
            <circle cx="8.5" cy="14" r="5" />
            <path d="M13 11.5 H20 A1 1 0 0 1 21 12.5 V15 A1 1 0 0 1 20 16 H13" fill="currentColor" fillOpacity="0.85" stroke="none" />
            <path d="M9 9 V6.5 A1.5 1.5 0 0 1 10.5 5 H12" />
        </svg>
    );
}

// Training cone
export function ConeIcon({ size = 16, ...props }: IconProps) {
    return (
        <svg {...base(size)} {...props}>
            <path d="M10 4 L14 4 L18 18 L6 18 Z" />
            <line x1="8.2" y1="11" x2="15.8" y2="11" />
            <line x1="4" y1="19.5" x2="20" y2="19.5" />
        </svg>
    );
}

// Classic soccer ball: circle, center pentagon, spokes to the seams
export function SoccerBallIcon({ size = 16, ...props }: IconProps) {
    return (
        <svg {...base(size)} {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8 L15.8 10.76 L14.35 15.24 L9.65 15.24 L8.2 10.76 Z" fill="currentColor" fillOpacity="0.85" stroke="none" />
            <path d="M12 3v5M15.8 10.76l4.76-1.54M14.35 15.24l2.94 4.04M9.65 15.24l-2.94 4.04M8.2 10.76L3.44 9.22" />
        </svg>
    );
}
