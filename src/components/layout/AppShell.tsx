'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookHeart, Sparkles, Heart, Star, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import LoginModal from '@/components/auth/LoginModal';
import Navbar from './Navbar';
import SyncManager from './SyncManager';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import {
    ShootingStars,
    TwinklingStars,
    AuroraEffect,
    FloatingBubbles,
    GlowingOrbs,
    FloatingParticles,
    GlitterDust,
} from '@/components/effects';
import { PulseRings, GridBackground } from '@/components/effects/MinorEffects';

interface AppShellProps {
    children: React.ReactNode;
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
    const reducedMotion = useReducedMotion();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* 背景特效 — reduced motion 模式下只保留基本效果 */}
            <GridBackground />
            <AuroraEffect />
            <GlowingOrbs />

            {!reducedMotion && (
                <>
                    <TwinklingStars />
                    <FloatingBubbles />
                    <GlitterDust />
                    <FloatingParticles />
                    <ShootingStars />
                    <PulseRings />
                </>
            )}

            {/* 頂部裝飾線 */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
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
