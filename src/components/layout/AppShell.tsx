'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookHeart, Sparkles, Heart, Star, Cloud, Moon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import Navbar from './Navbar';
import SyncManager from './SyncManager';
import ErrorBoundary from '@/components/common/ErrorBoundary';

interface AppShellProps {
    children: React.ReactNode;
}

// 浮動粒子組件
function FloatingParticles() {
    const particles = [
        { icon: Heart, x: '10%', y: '20%', delay: 0, duration: 6, size: 20 },
        { icon: Star, x: '85%', y: '15%', delay: 1, duration: 7, size: 16 },
        { icon: Cloud, x: '75%', y: '70%', delay: 2, duration: 8, size: 24 },
        { icon: Moon, x: '15%', y: '75%', delay: 0.5, duration: 5, size: 18 },
        { icon: Heart, x: '90%', y: '45%', delay: 1.5, duration: 6, size: 14 },
        { icon: Star, x: '5%', y: '50%', delay: 2.5, duration: 7, size: 20 },
        { icon: Sparkles, x: '50%', y: '10%', delay: 0.8, duration: 5, size: 16 },
        { icon: Heart, x: '60%', y: '85%', delay: 1.2, duration: 6, size: 18 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => {
                const Icon = particle.icon;
                return (
                    <motion.div
                        key={i}
                        className="absolute text-purple-500/20"
                        style={{ left: particle.x, top: particle.y }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0],
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
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
            {/* 背景特效 */}
            <GridBackground />
            <GlowingOrbs />
            <FloatingParticles />

            {/* 頂部裝飾線 */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.5 }}
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
                        className="absolute inset-0 w-28 h-28 mx-auto rounded-3xl bg-purple-500/20 blur-xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        style={{ top: '-8px', left: 'calc(50% - 56px)' }}
                    />
                    <motion.div
                        className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 relative"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        <BookHeart className="w-12 h-12 text-white" />
                        {/* 閃爍星星 */}
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
                <motion.button
                    onClick={onLogin}
                    className="btn btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* 按鈕光暈效果 */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30"
                        style={{
                            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), white 0%, transparent 50%)',
                        }}
                    />
                    <Sparkles className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">開始使用</span>
                </motion.button>

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
                    className="flex justify-center gap-2 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {['😢', '😔', '😐', '😊', '🤩'].map((emoji, i) => (
                        <motion.span
                            key={i}
                            className="text-lg opacity-30"
                            animate={{
                                y: [0, -5, 0],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        >
                            {emoji}
                        </motion.span>
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
