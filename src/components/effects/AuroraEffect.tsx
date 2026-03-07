'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

function AuroraEffect() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute -top-1/2 left-0 right-0 h-full"
                style={{
                    background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 30%, transparent 60%)',
                }}
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute -top-1/2 left-0 right-0 h-full"
                style={{
                    background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)',
                }}
                animate={{
                    opacity: [0.2, 0.5, 0.2],
                    y: [10, -10, 10],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />
        </div>
    );
}

export default memo(AuroraEffect);
