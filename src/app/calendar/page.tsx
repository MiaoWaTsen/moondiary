'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEntriesByMonth } from '@/hooks/useDiary';
import { MOOD_CONFIG, DiaryEntry } from '@/types';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import DiaryEditor from '@/components/diary/DiaryEditor';
import DiaryModal from '@/components/diary/DiaryModal';
import { Skeleton } from '@/components/common/Skeleton';

// Dynamic import for react-calendar to reduce initial bundle
const Calendar = dynamic(() => import('react-calendar'), {
    ssr: false,
    loading: () => (
        <div className="p-4">
            <div className="grid grid-cols-7 gap-2 mb-4">
                {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
                    <div key={d} className="text-center text-sm text-gray-400">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
            </div>
        </div>
    ),
});

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [viewMonth, setViewMonth] = useState<Date>(new Date());
    const [showEditor, setShowEditor] = useState(false);
    const [viewEntry, setViewEntry] = useState<DiaryEntry | null>(null);

    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth() + 1;
    const entries = useEntriesByMonth(year, month);

    // 建立日期到日記的映射
    const entryMap = new Map<string, DiaryEntry>();
    entries?.forEach((entry) => {
        entryMap.set(entry.date, entry);
    });

    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    const selectedEntry = entryMap.get(selectedDateStr);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        const dateStr = format(date, 'yyyy-MM-dd');
        const entry = entryMap.get(dateStr);
        if (entry) {
            setViewEntry(entry);
        } else {
            setShowEditor(true);
        }
    };

    // 渲染日曆格子內容
    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view !== 'month') return null;

        const dateStr = format(date, 'yyyy-MM-dd');
        const entry = entryMap.get(dateStr);

        if (!entry) return null;

        const moodConfig = MOOD_CONFIG[entry.mood];

        return (
            <motion.div
                className="absolute bottom-1 left-1/2 -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            >
                <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: moodConfig.color }}
                />
            </motion.div>
        );
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            {/* 頭部 */}
            <motion.header
                className="text-center py-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold">📅 日曆</h1>
                <p className="text-gray-400 mt-1">查看每一天的心情</p>
            </motion.header>

            {/* 月份導航 */}
            <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <button
                    onClick={() => setViewMonth(new Date(year, month - 2, 1))}
                    className="btn btn-secondary p-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-lg font-medium">
                    {format(viewMonth, 'yyyy 年 M 月', { locale: zhTW })}
                </span>
                <button
                    onClick={() => setViewMonth(new Date(year, month, 1))}
                    className="btn btn-secondary p-2"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </motion.div>

            {/* 日曆 */}
            <motion.div
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Calendar
                    value={selectedDate}
                    onClickDay={handleDateClick}
                    activeStartDate={viewMonth}
                    onActiveStartDateChange={({ activeStartDate }) => {
                        if (activeStartDate) setViewMonth(activeStartDate);
                    }}
                    tileContent={tileContent}
                    tileClassName={({ date }) => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        const entry = entryMap.get(dateStr);
                        return entry ? 'has-entry relative' : 'relative';
                    }}
                    locale="zh-TW"
                    showNavigation={false}
                    formatDay={(locale, date) => format(date, 'd')}
                />
            </motion.div>

            {/* 心情圖例 */}
            <motion.div
                className="mt-6 card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h3 className="text-sm text-gray-400 mb-3">心情圖例</h3>
                <div className="flex justify-around">
                    {Object.entries(MOOD_CONFIG).map(([key, config]) => (
                        <div key={key} className="flex flex-col items-center gap-1">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: config.color }}
                            />
                            <span className="text-xs text-gray-400">{config.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* 當月統計 */}
            {entries && entries.length > 0 && (
                <motion.div
                    className="mt-4 card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-sm text-gray-400 mb-2">本月統計</h3>
                    <p className="text-2xl font-bold text-purple-400">
                        {entries.length} <span className="text-base font-normal text-gray-400">篇日記</span>
                    </p>
                </motion.div>
            )}

            {/* 編輯器彈窗 */}
            {showEditor && (
                <motion.div
                    className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="min-h-full p-4 py-8">
                        <div className="max-w-lg mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">
                                    ✍️ {format(selectedDate, 'M/d')} 的日記
                                </h2>
                                <button
                                    onClick={() => setShowEditor(false)}
                                    className="btn btn-secondary text-sm"
                                >
                                    關閉
                                </button>
                            </div>
                            <DiaryEditor
                                entry={selectedEntry}
                                date={selectedDateStr}
                                onSave={() => setShowEditor(false)}
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* 查看日記彈窗 */}
            {viewEntry && (
                <DiaryModal entry={viewEntry} onClose={() => setViewEntry(null)} />
            )}
        </div>
    );
}
