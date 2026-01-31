'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookHeart, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import Navbar from './Navbar';
import SyncManager from './SyncManager';
import ErrorBoundary from '@/components/common/ErrorBoundary';

interface AppShellProps {
    children: React.ReactNode;
}

// Loading 畫面組件
function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin">
                    <BookHeart className="w-12 h-12 text-purple-400" />
                </div>
                <p className="text-gray-400">載入中...</p>
            </div>
        </div>
    );
}

// 歡迎頁面組件
function WelcomeScreen({ onLogin }: { onLogin: () => void }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <motion.div
                className="text-center max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Logo */}
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                >
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <BookHeart className="w-12 h-12 text-white" />
                    </div>
                </motion.div>

                {/* 標題 */}
                <motion.h1
                    className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
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
                    <div className="text-center">
                        <div className="text-2xl mb-1">📝</div>
                        <p className="text-xs text-gray-500">寫日記</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl mb-1">📊</div>
                        <p className="text-xs text-gray-500">心情統計</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl mb-1">☁️</div>
                        <p className="text-xs text-gray-500">雲端同步</p>
                    </div>
                </motion.div>

                {/* 登入按鈕 */}
                <motion.button
                    onClick={onLogin}
                    className="btn btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Sparkles className="w-5 h-5" />
                    開始使用
                </motion.button>

                <motion.p
                    className="text-gray-600 text-xs mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    登入後即可開始記錄你的心情日記
                </motion.p>
            </motion.div>
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
