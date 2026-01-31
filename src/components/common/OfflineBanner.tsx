'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export default function OfflineBanner() {
    const isOnline = useOnlineStatus();

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    className="fixed top-0 left-0 right-0 z-50 bg-amber-500/90 backdrop-blur-sm py-2 px-4"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="flex items-center justify-center gap-2 text-amber-950 text-sm font-medium">
                        <WifiOff className="w-4 h-4" />
                        <span>目前處於離線狀態，變更將在恢復連線後同步</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
