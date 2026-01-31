'use client';

import { useSync } from '@/hooks/useSync';
import { Loader2, CloudOff, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SyncManager() {
    const { isSyncing, syncError, clearError, syncNow } = useSync();

    return (
        <>
            {/* 同步中指示器 */}
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

            {/* 同步錯誤提示 */}
            <AnimatePresence>
                {syncError && !isSyncing && (
                    <motion.div
                        className="fixed bottom-4 left-4 z-50 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-lg max-w-sm"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    >
                        <CloudOff className="w-4 h-4 text-red-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-red-300 font-medium">同步失敗</p>
                            <p className="text-xs text-red-400/80 truncate">{syncError}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={syncNow}
                                className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                                title="重試"
                            >
                                <RefreshCw className="w-3.5 h-3.5 text-red-400" />
                            </button>
                            <button
                                onClick={clearError}
                                className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                                title="關閉"
                            >
                                <X className="w-3.5 h-3.5 text-red-400" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
