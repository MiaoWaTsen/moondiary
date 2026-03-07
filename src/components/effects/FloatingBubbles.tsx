'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

// 氣泡數量從 7 → 4，修復 SSR window 引用
function FloatingBubbles() {
    const bubbles = [
        { size: 60, x: '10%', delay: 0, duration: 15 },
        { size: 40, x: '25%', delay: 2, duration: 12 },
        { size: 80, x: '55%', delay: 4, duration: 18 },
        { size: 50, x: '80%', delay: 1, duration: 14 },
    ];

    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {bubbles.map((bubble, i) => (
                <motion.div
                    key={i}
                    className="absolute bottom-0 rounded-full"
                    style={{
                        width: bubble.size,
                        height: bubble.size,
                        left: bubble.x,
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)',
                        border: '1px solid rgba(255,255,255,0.05)',
                    }}
                    animate={{
                        y: [0, -viewportHeight],
                        x: [0, Math.sin(i) * 50, 0],
                        opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                        duration: bubble.duration,
                        delay: bubble.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

export default memo(FloatingBubbles);
