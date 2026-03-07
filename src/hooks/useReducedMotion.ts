'use client';

import { useState, useEffect } from 'react';

/**
 * 偵測使用者是否偏好減少動畫 (prefers-reduced-motion)
 * 在精簡模式下回傳 true，供元件減少或停用動畫
 */
export function useReducedMotion(): boolean {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mql.matches);

        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return reducedMotion;
}
