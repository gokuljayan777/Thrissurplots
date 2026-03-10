'use client';

import { ReactLenis } from 'lenis/react';

export default function LenisProvider({ children }) {
    // The 'root' prop tells Lenis to hijack the native scroll on the <html> element
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}