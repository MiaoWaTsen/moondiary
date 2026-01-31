'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { DiaryEntry, MOOD_CONFIG } from '@/types';
import { formatDate } from '@/lib/utils';

interface DiaryModalProps {
    entry: DiaryEntry | null;
    onClose: () => void;
}

function DiaryModal({ entry, onClose }: DiaryModalProps) {
    if (!entry) return null;

    const moodConfig = MOOD_CONFIG[entry.mood];

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* 背景遮罩 */}
                <motion.div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                {/* 彈窗內容 */}
                <motion.div
                    className="relative bg-gray-900 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-gray-700"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                >
                    {/* 關閉按鈕 */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* 頭部 - 心情和日期 */}
                    <div
                        className="p-6 text-center"
                        style={{
                            background: `linear-gradient(135deg, ${moodConfig.color}20, transparent)`,
                        }}
                    >
                        <span className="text-5xl mb-2 inline-block">{moodConfig.emoji}</span>
                        <h2 className="text-2xl font-bold mt-2">{entry.title || '無標題'}</h2>
                        <p className="text-gray-400 mt-1">{formatDate(entry.date)}</p>

                        {/* 天氣/地點 */}
                        <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-400">
                            {entry.weather && (
                                <span>
                                    {entry.weather.icon} {entry.weather.temperature}°C
                                </span>
                            )}
                            {entry.location?.city && <span>📍 {entry.location.city}</span>}
                        </div>
                    </div>

                    {/* 內容 */}
                    <div className="p-6 pt-0 space-y-6">
                        {/* 文字內容 */}
                        {entry.content && (
                            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                                {entry.content}
                            </div>
                        )}

                        {/* 照片 */}
                        {entry.photos.length > 0 && (
                            <div className="photo-grid">
                                {entry.photos.map((photo) => (
                                    <div key={photo.id} className="photo-item">
                                        <img
                                            src={photo.data}
                                            alt={photo.caption || ''}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 標籤 */}
                        {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {entry.tags.map((tag) => (
                                    <span key={tag} className="tag">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default memo(DiaryModal);
