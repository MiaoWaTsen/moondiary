'use client';

import { useState, useEffect } from 'react';

/**
 * 偵測是否為手機裝置（螢幕寬度 ≤ 768px）
 * 用於在手機上簡化動畫效果，提升效能
 */
export function useMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();

        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return isMobile;
}
