'use client';

import { useSync } from '@/hooks/useSync';
import { Loader2, CloudCheck, CloudOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SyncManager() {
    const { isSyncing, lastSyncTime } = useSync();

    // 可以選擇性地顯示同步狀態指示器
    return (
        <AnimatePresence>
            {isSyncing && (
                <motion.div
                    className="fixed bottom-4 left-4 z-50 bg-[#1a1a24] border border-[#2a2a3a] rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <Loader2 className="w-3 h-3 text-purple-400 animate-spin" />
                    <span className="text-xs text-gray-400">同步中...</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
