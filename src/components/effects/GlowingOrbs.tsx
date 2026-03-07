'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

// 光暈數量從 5 → 3
function GlowingOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* 主光暈 */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    left: '50%',
                    top: '30%',
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            {/* 左下光暈 */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                    left: '-10%',
                    bottom: '10%',
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            {/* 右上光暈 */}
            <motion.div
                className="absolute w-[250px] h-[250px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
                    right: '-5%',
                    top: '20%',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}

export default memo(GlowingOrbs);
