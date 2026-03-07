'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

// 脈衝光環
export const PulseRings = memo(function PulseRings() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '-15%' }}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-purple-500/20"
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    animate={{
                        scale: [1, 3],
                        opacity: [0.4, 0],
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 1,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
});

// 網格背景
export const GridBackground = memo(function GridBackground() {
    return (
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
            }}
        />
    );
});
