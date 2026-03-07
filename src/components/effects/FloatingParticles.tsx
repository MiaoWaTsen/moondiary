'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Cloud, Moon, Sparkles, Zap } from 'lucide-react';

// 粒子數量從 12 → 6
function FloatingParticles() {
    const particles = [
        { icon: Heart, x: '10%', y: '20%', delay: 0, duration: 6, size: 20, color: 'text-pink-500/30' },
        { icon: Star, x: '85%', y: '15%', delay: 1, duration: 7, size: 16, color: 'text-yellow-500/30' },
        { icon: Cloud, x: '75%', y: '70%', delay: 2, duration: 8, size: 24, color: 'text-blue-500/30' },
        { icon: Moon, x: '15%', y: '75%', delay: 0.5, duration: 5, size: 18, color: 'text-purple-500/30' },
        { icon: Sparkles, x: '50%', y: '10%', delay: 0.8, duration: 5, size: 16, color: 'text-purple-400/30' },
        { icon: Zap, x: '35%', y: '30%', delay: 1.8, duration: 5, size: 14, color: 'text-yellow-400/30' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => {
                const Icon = particle.icon;
                return (
                    <motion.div
                        key={i}
                        className={`absolute ${particle.color}`}
                        style={{ left: particle.x, top: particle.y }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 15, -15, 0],
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <Icon size={particle.size} />
                    </motion.div>
                );
            })}
        </div>
    );
}

export default memo(FloatingParticles);
