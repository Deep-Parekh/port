'use client';

import { useEffect } from 'react';
import { getCalApi } from "@calcom/embed-react";
import Hero from '@/components/Hero';

export default function SchedulePage() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", { "theme": "dark", "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "column_view" });
            cal("on", {
                action: "bookingSuccessful",
                callback: (e) => {
                    alert("Meeting scheduled successfully! Check your email for the invite.");
                }
            });
        })();
    }, []);

    return (
        <div style={{ minHeight: '100vh', padding: '100px 0' }}>
            <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Schedule a Meeting</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Book a time to chat about opportunities.</p>
            </div>

            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <iframe
                    src="https://cal.com/deep-parekh-lrs1mu/30min?theme=dark"
                    style={{ width: '100%', height: '700px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}
                    title="Cal.com Schedule"
                ></iframe>
            </div>
        </div>
    );
}
