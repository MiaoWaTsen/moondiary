'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookHeart, Sparkles, Heart, Star, Cloud, Moon, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import Navbar from './Navbar';
import SyncManager from './SyncManager';
import ErrorBoundary from '@/components/common/ErrorBoundary';

interface AppShellProps {
    children: React.ReactNode;
}

// 流星效果
function ShootingStars() {
    const stars = [
        { delay: 0, duration: 1.5, top: '10%', left: '20%' },
        { delay: 2, duration: 1.2, top: '20%', left: '80%' },
        { delay: 4, duration: 1.8, top: '15%', left: '50%' },
        { delay: 6, duration: 1.4, top: '25%', left: '30%' },
        { delay: 8, duration: 1.6, top: '5%', left: '70%' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ top: star.top, left: star.left }}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        x: [0, 150],
                        y: [0, 150],
                    }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        repeatDelay: 10,
                        ease: 'easeOut',
                    }}
                >
                    {/* 流星尾巴 */}
                    <div className="absolute w-20 h-[2px] -left-20 top-0 bg-gradient-to-r from-transparent via-white/50 to-white"
                         style={{ transform: 'rotate(-45deg)', transformOrigin: 'right center' }} />
                </motion.div>
            ))}
        </div>
    );
}

// 閃爍星星背景
function TwinklingStars() {
    const [stars] = useState(() =>
        Array.from({ length: 50 }, (_, i) => ({
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

// 極光效果
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

// 浮動氣泡
function FloatingBubbles() {
    const bubbles = [
        { size: 60, x: '10%', delay: 0, duration: 15 },
        { size: 40, x: '25%', delay: 2, duration: 12 },
        { size: 80, x: '45%', delay: 4, duration: 18 },
        { size: 50, x: '65%', delay: 1, duration: 14 },
        { size: 35, x: '85%', delay: 3, duration: 16 },
        { size: 45, x: '55%', delay: 5, duration: 13 },
        { size: 70, x: '30%', delay: 6, duration: 17 },
    ];

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
                        y: [0, -window?.innerHeight || -800],
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

// 脈衝光環
function PulseRings() {
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
}

// 漂浮光點
function GlitterDust() {
    const [particles] = useState(() =>
        Array.from({ length: 30 }, (_, i) => ({
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

// 浮動粒子組件
function FloatingParticles() {
    const particles = [
        { icon: Heart, x: '10%', y: '20%', delay: 0, duration: 6, size: 20, color: 'text-pink-500/30' },
        { icon: Star, x: '85%', y: '15%', delay: 1, duration: 7, size: 16, color: 'text-yellow-500/30' },
        { icon: Cloud, x: '75%', y: '70%', delay: 2, duration: 8, size: 24, color: 'text-blue-500/30' },
        { icon: Moon, x: '15%', y: '75%', delay: 0.5, duration: 5, size: 18, color: 'text-purple-500/30' },
        { icon: Heart, x: '90%', y: '45%', delay: 1.5, duration: 6, size: 14, color: 'text-pink-500/25' },
        { icon: Star, x: '5%', y: '50%', delay: 2.5, duration: 7, size: 20, color: 'text-yellow-500/25' },
        { icon: Sparkles, x: '50%', y: '10%', delay: 0.8, duration: 5, size: 16, color: 'text-purple-400/30' },
        { icon: Heart, x: '60%', y: '85%', delay: 1.2, duration: 6, size: 18, color: 'text-pink-500/25' },
        { icon: Zap, x: '35%', y: '30%', delay: 1.8, duration: 5, size: 14, color: 'text-yellow-400/30' },
        { icon: Star, x: '70%', y: '40%', delay: 2.2, duration: 6, size: 12, color: 'text-blue-400/25' },
        { icon: Moon, x: '45%', y: '65%', delay: 0.3, duration: 7, size: 16, color: 'text-indigo-500/25' },
        { icon: Sparkles, x: '20%', y: '45%', delay: 1.7, duration: 5, size: 14, color: 'text-pink-400/30' },
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

// 背景光暈組件
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
            {/* 中下光暈 */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
                    left: '30%',
                    bottom: '-10%',
                }}
                animate={{
                    scale: [1, 1.4, 1],
                    x: [-20, 20, -20],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            {/* 右下光暈 */}
            <motion.div
                className="absolute w-[350px] h-[350px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.06) 0%, transparent 70%)',
                    right: '10%',
                    bottom: '20%',
                }}
                animate={{
                    scale: [1.1, 1.3, 1.1],
                    y: [-10, 10, -10],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                }}
            />
        </div>
    );
}

// 網格背景
function GridBackground() {
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
}

// Loading 畫面組件
function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <GlowingOrbs />
            <div className="flex flex-col items-center gap-4 z-10">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    <BookHeart className="w-12 h-12 text-purple-400" />
                </motion.div>
                <motion.p
                    className="text-gray-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    載入中...
                </motion.p>
            </div>
        </div>
    );
}

// 歡迎頁面組件
function WelcomeScreen({ onLogin }: { onLogin: () => void }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* 背景特效 - 層層疊加 */}
            <GridBackground />
            <AuroraEffect />
            <TwinklingStars />
            <GlowingOrbs />
            <FloatingBubbles />
            <GlitterDust />
            <FloatingParticles />
            <ShootingStars />
            <PulseRings />

            {/* 頂部裝飾線 */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
            {/* 第二條裝飾線 */}
            <motion.div
                className="absolute top-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 0.7, opacity: 0.3 }}
                transition={{ duration: 1.2, delay: 0.7 }}
            />

            <motion.div
                className="text-center max-w-md z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Logo */}
                <motion.div
                    className="mb-8 relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                >
                    {/* Logo 外圈光暈 */}
                    <motion.div
                        className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-purple-500/20 blur-xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.9, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        style={{ top: '-16px', left: 'calc(50% - 64px)' }}
                    />
                    {/* 第二層光暈 */}
                    <motion.div
                        className="absolute inset-0 w-36 h-36 mx-auto rounded-full bg-pink-500/10 blur-2xl"
                        animate={{
                            scale: [1.1, 1.4, 1.1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.5,
                        }}
                        style={{ top: '-24px', left: 'calc(50% - 72px)' }}
                    />

                    {/* 旋轉軌道環 1 */}
                    <motion.div
                        className="absolute w-32 h-32 rounded-full border border-purple-500/20"
                        style={{ top: '-16px', left: 'calc(50% - 64px)' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    >
                        <motion.div
                            className="absolute w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400"
                            style={{ top: '-4px', left: 'calc(50% - 4px)' }}
                        />
                    </motion.div>

                    {/* 旋轉軌道環 2 */}
                    <motion.div
                        className="absolute w-40 h-40 rounded-full border border-pink-500/10"
                        style={{ top: '-32px', left: 'calc(50% - 80px)' }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    >
                        <motion.div
                            className="absolute w-1.5 h-1.5 bg-pink-400 rounded-full shadow-lg shadow-pink-400"
                            style={{ top: '-3px', left: 'calc(50% - 3px)' }}
                        />
                        <motion.div
                            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400"
                            style={{ bottom: '-3px', left: 'calc(50% - 3px)' }}
                        />
                    </motion.div>

                    <motion.div
                        className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 relative"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        animate={{
                            boxShadow: [
                                '0 10px 40px rgba(139, 92, 246, 0.3)',
                                '0 10px 60px rgba(236, 72, 153, 0.4)',
                                '0 10px 40px rgba(139, 92, 246, 0.3)',
                            ],
                        }}
                        transition={{
                            boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                            rotate: { duration: 0.5 },
                        }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <BookHeart className="w-12 h-12 text-white drop-shadow-lg" />
                        </motion.div>

                        {/* 閃爍星星們 */}
                        <motion.div
                            className="absolute -top-1 -right-1"
                            animate={{
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 1,
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-1 -left-1"
                            animate={{
                                scale: [0, 1, 0],
                                rotate: [0, -180, -360],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: 0.5,
                            }}
                        >
                            <Star className="w-3 h-3 text-yellow-200 fill-yellow-200" />
                        </motion.div>
                        <motion.div
                            className="absolute top-1/2 -right-2"
                            animate={{
                                scale: [0.5, 1, 0.5],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: 0.8,
                            }}
                        >
                            <Heart className="w-2.5 h-2.5 text-pink-300 fill-pink-300" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* 標題 */}
                <motion.h1
                    className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4 bg-[length:200%_auto]"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        backgroundPosition: ['0% center', '200% center'],
                    }}
                    transition={{
                        opacity: { delay: 0.3 },
                        backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' }
                    }}
                >
                    Moodiary
                </motion.h1>

                <motion.p
                    className="text-gray-400 text-lg mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    記錄每一天的心情
                </motion.p>

                <motion.p
                    className="text-gray-500 text-sm mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    讓記憶回歸本真，讓紀錄成為享受
                </motion.p>

                {/* 功能介紹 */}
                <motion.div
                    className="grid grid-cols-3 gap-4 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {[
                        { emoji: '📝', label: '寫日記', delay: 0 },
                        { emoji: '📊', label: '心情統計', delay: 0.1 },
                        { emoji: '☁️', label: '雲端同步', delay: 0.2 },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                borderColor: 'rgba(139, 92, 246, 0.3)',
                            }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + item.delay }}
                        >
                            <motion.div
                                className="text-2xl mb-1"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            >
                                {item.emoji}
                            </motion.div>
                            <p className="text-xs text-gray-500">{item.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 登入按鈕 */}
                <motion.div className="relative w-full">
                    {/* 按鈕外光暈 */}
                    <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-50"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.button
                        onClick={onLogin}
                        className="btn btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 relative overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* 流動漸變背景 */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-[length:200%_100%]"
                            animate={{
                                backgroundPosition: ['0% center', '200% center'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                        {/* 光澤掃過效果 */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            animate={{
                                x: ['-200%', '200%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Sparkles className="w-5 h-5 relative z-10" />
                        </motion.div>
                        <span className="relative z-10 font-bold">開始使用</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Zap className="w-4 h-4 relative z-10" />
                        </motion.div>
                    </motion.button>
                </motion.div>

                <motion.p
                    className="text-gray-600 text-xs mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    登入後即可開始記錄你的心情日記
                </motion.p>

                {/* 底部裝飾 */}
                <motion.div
                    className="flex justify-center gap-3 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {['😢', '😔', '😐', '😊', '🤩'].map((emoji, i) => (
                        <motion.span
                            key={i}
                            className="text-2xl cursor-pointer"
                            animate={{
                                y: [0, -8, 0],
                                scale: [1, 1.1, 1],
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            whileHover={{
                                scale: 1.3,
                                opacity: 1,
                                y: -10,
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.15,
                            }}
                        >
                            {emoji}
                        </motion.span>
                    ))}
                </motion.div>

                {/* 連接線動畫 */}
                <motion.div
                    className="flex justify-center items-center gap-1 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 h-1 rounded-full bg-purple-500/50"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* 底部裝飾線 */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.7 }}
            />
            {/* 第二條底部線 */}
            <motion.div
                className="absolute bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 0.6, opacity: 0.3 }}
                transition={{ duration: 1.2, delay: 0.9 }}
            />

            {/* 角落裝飾 */}
            <motion.div
                className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-purple-500/20 rounded-tl-3xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            />
            <motion.div
                className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-pink-500/20 rounded-tr-3xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
            />
            <motion.div
                className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-blue-500/20 rounded-bl-3xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            />
            <motion.div
                className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-purple-500/20 rounded-br-3xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
            />
        </div>
    );
}

export default function AppShell({ children }: AppShellProps) {
    const { user, loading } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // 確保只在客戶端渲染
    useEffect(() => {
        setIsClient(true);
    }, []);

    // 伺服器端和客戶端初始狀態都顯示 loading
    // 這樣可以避免 hydration 錯誤
    if (!isClient) {
        return <LoadingScreen />;
    }

    // 客戶端：檢查 auth loading 狀態
    if (loading) {
        return <LoadingScreen />;
    }

    // 未登入顯示歡迎頁面
    if (!user) {
        return (
            <>
                <WelcomeScreen onLogin={() => setShowLogin(true)} />
                <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
            </>
        );
    }

    // 已登入顯示應用內容
    return (
        <>
            <SyncManager />
            <main className="page-content">
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </main>
            <Navbar />
        </>
    );
}
