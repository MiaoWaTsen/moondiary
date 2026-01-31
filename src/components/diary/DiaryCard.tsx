'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { DiaryEntry, MOOD_CONFIG } from '@/types';
import { formatDate } from '@/lib/utils';

interface DiaryCardProps {
    entry: DiaryEntry;
    onClick?: () => void;
}

export default function DiaryCard({ entry, onClick }: DiaryCardProps) {
    const moodConfig = MOOD_CONFIG[entry.mood];

    return (
        <motion.div
            className="card cursor-pointer group"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex gap-4">
                {/* 心情圖標 */}
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                    style={{ backgroundColor: `${moodConfig.color}20` }}
                >
                    {moodConfig.emoji}
                </div>

                {/* 內容 */}
                <div className="flex-1 min-w-0">
                    {/* 標題 */}
                    <h3 className="font-medium text-lg truncate">
                        {entry.title || '無標題'}
                    </h3>

                    {/* 日期和地點 */}
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(entry.date)}
                        </span>
                        {entry.location?.city && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {entry.location.city}
                            </span>
                        )}
                        {entry.weather && (
                            <span>
                                {entry.weather.icon} {entry.weather.temperature}°C
                            </span>
                        )}
                    </div>

                    {/* 內容預覽 */}
                    {entry.content && (
                        <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                            {entry.content}
                        </p>
                    )}

                    {/* 標籤和照片數量 */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {entry.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="tag text-xs">
                                #{tag}
                            </span>
                        ))}
                        {entry.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                                +{entry.tags.length - 3}
                            </span>
                        )}
                        {entry.photos.length > 0 && (
                            <span className="text-xs text-gray-500 ml-auto">
                                📷 {entry.photos.length}
                            </span>
                        )}
                    </div>
                </div>

                {/* 照片預覽 */}
                {entry.photos.length > 0 && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img
                            src={entry.photos[0].data}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
