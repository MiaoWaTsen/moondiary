'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';

// 星星數量從 50 → 20，減少 DOM 元素
function TwinklingStars() {
    const [stars] = useState(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 1,
            delay: Math.random() * 3,
            duration: Math.random() * 2 + 1,
        }))
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: star.x,
                        top: star.y,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

export default memo(TwinklingStars);
