'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

function ShootingStars() {
    const stars = [
        { delay: 0, duration: 1.2, top: '5%', left: '70%' },
        { delay: 3, duration: 1.0, top: '10%', left: '85%' },
        { delay: 5, duration: 1.4, top: '8%', left: '60%' },
        { delay: 8, duration: 1.1, top: '15%', left: '90%' },
        { delay: 11, duration: 1.3, top: '3%', left: '75%' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{ top: star.top, left: star.left }}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        x: [0, -200],
                        y: [0, 120],
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        repeatDelay: 8,
                        ease: 'easeIn',
                    }}
                >
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]" />
                    <div
                        className="absolute top-0 left-0 w-24 h-[2px]"
                        style={{
                            background: 'linear-gradient(to left, white, rgba(255,255,255,0.5), transparent)',
                            transform: 'rotate(-30deg)',
                            transformOrigin: 'left center',
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

export default memo(ShootingStars);
