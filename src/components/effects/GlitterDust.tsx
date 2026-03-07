'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';

// 光點數量從 30 → 12
function GlitterDust() {
    const [particles] = useState(() =>
        Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
            color: ['#8B5CF6', '#EC4899', '#3B82F6', '#FBBF24'][Math.floor(Math.random() * 4)],
        }))
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1, 0.5],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

export default memo(GlitterDust);
