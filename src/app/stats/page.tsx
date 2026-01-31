'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useStats } from '@/hooks/useDiary';
import { MOOD_CONFIG, MoodType } from '@/types';
import { format, subDays, parseISO } from 'date-fns';
import { ChartSkeleton, StatsCardSkeleton } from '@/components/common/Skeleton';

// Dynamic imports for Recharts to reduce initial bundle
const LineChart = dynamic(
    () => import('recharts').then(mod => mod.LineChart),
    { ssr: false, loading: () => <ChartSkeleton /> }
);
const Line = dynamic(
    () => import('recharts').then(mod => mod.Line),
    { ssr: false }
);
const XAxis = dynamic(
    () => import('recharts').then(mod => mod.XAxis),
    { ssr: false }
);
const YAxis = dynamic(
    () => import('recharts').then(mod => mod.YAxis),
    { ssr: false }
);
const Tooltip = dynamic(
    () => import('recharts').then(mod => mod.Tooltip),
    { ssr: false }
);
const ResponsiveContainer = dynamic(
    () => import('recharts').then(mod => mod.ResponsiveContainer),
    { ssr: false }
);
const PieChart = dynamic(
    () => import('recharts').then(mod => mod.PieChart),
    { ssr: false }
);
const Pie = dynamic(
    () => import('recharts').then(mod => mod.Pie),
    { ssr: false }
);
const Cell = dynamic(
    () => import('recharts').then(mod => mod.Cell),
    { ssr: false }
);

const MOOD_VALUES: Record<MoodType, number> = {
    terrible: 1,
    bad: 2,
    okay: 3,
    good: 4,
    amazing: 5,
};

export default function StatsPage() {
    const stats = useStats();

    // 最近 30 天的心情趨勢
    const moodTrend = useMemo(() => {
        if (!stats?.entries) return [];

        const last30Days = Array.from({ length: 30 }, (_, i) => {
            const date = subDays(new Date(), 29 - i);
            return format(date, 'yyyy-MM-dd');
        });

        return last30Days.map((date) => {
            const entry = stats.entries.find((e) => e.date === date);
            return {
                date: format(parseISO(date), 'M/d'),
                value: entry ? MOOD_VALUES[entry.mood] : null,
                mood: entry?.mood,
            };
        });
    }, [stats?.entries]);

    // 心情分佈圓餅圖資料
    const moodDistribution = useMemo(() => {
        if (!stats) return [];

        return Object.entries(stats.moodCounts)
            .filter(([, count]) => count > 0)
            .map(([mood, count]) => ({
                name: MOOD_CONFIG[mood as MoodType].label,
                value: count,
                color: MOOD_CONFIG[mood as MoodType].color,
                emoji: MOOD_CONFIG[mood as MoodType].emoji,
            }));
    }, [stats]);

    // 計算連續寫日記天數
    const streak = useMemo(() => {
        if (!stats?.entries.length) return 0;

        const sortedDates = stats.entries
            .map((e) => e.date)
            .sort()
            .reverse();

        let count = 0;
        let currentDate = new Date();

        for (const dateStr of sortedDates) {
            const expectedDate = format(subDays(currentDate, count), 'yyyy-MM-dd');
            if (dateStr === expectedDate) {
                count++;
            } else if (count === 0) {
                // 今天還沒寫，檢查昨天
                const yesterday = format(subDays(currentDate, 1), 'yyyy-MM-dd');
                if (dateStr === yesterday) {
                    count++;
                    currentDate = subDays(currentDate, 1);
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        return count;
    }, [stats?.entries]);

    if (!stats) {
        return (
            <div className="p-4 max-w-lg mx-auto">
                <div className="text-center py-6 mb-6">
                    <div className="h-8 w-32 mx-auto bg-gray-800 rounded animate-pulse" />
                    <div className="h-4 w-48 mx-auto mt-2 bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <StatsCardSkeleton />
                    <StatsCardSkeleton />
                    <StatsCardSkeleton />
                </div>
                <ChartSkeleton />
            </div>
        );
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            {/* 頭部 */}
            <motion.header
                className="text-center py-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold">📊 統計分析</h1>
                <p className="text-gray-400 mt-1">了解你的心情變化</p>
            </motion.header>

            {/* 快速統計 */}
            <motion.div
                className="grid grid-cols-3 gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="card text-center">
                    <motion.p
                        className="text-3xl font-bold text-purple-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                    >
                        {stats.totalEntries}
                    </motion.p>
                    <p className="text-xs text-gray-400 mt-1">總日記數</p>
                </div>
                <div className="card text-center">
                    <motion.p
                        className="text-3xl font-bold text-blue-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                    >
                        {streak}
                    </motion.p>
                    <p className="text-xs text-gray-400 mt-1">連續天數</p>
                </div>
                <div className="card text-center">
                    <motion.p
                        className="text-3xl font-bold text-green-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.3 }}
                    >
                        {stats.totalPhotos}
                    </motion.p>
                    <p className="text-xs text-gray-400 mt-1">總照片數</p>
                </div>
            </motion.div>

            {/* 心情趨勢圖 */}
            {stats.totalEntries > 0 && (
                <motion.div
                    className="chart-container mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-sm text-gray-400 mb-4">最近 30 天心情趨勢</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={moodTrend}>
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: '#64748b', fontSize: 10 }}
                                    tickLine={false}
                                    axisLine={false}
                                    interval="preserveStartEnd"
                                />
                                <YAxis
                                    domain={[1, 5]}
                                    tick={{ fill: '#64748b', fontSize: 10 }}
                                    tickLine={false}
                                    axisLine={false}
                                    ticks={[1, 2, 3, 4, 5]}
                                    tickFormatter={(v: number) => {
                                        const moods: MoodType[] = ['terrible', 'bad', 'okay', 'good', 'amazing'];
                                        return MOOD_CONFIG[moods[v - 1]]?.emoji || '';
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: '#1a1a24',
                                        border: '1px solid #2a2a3a',
                                        borderRadius: '8px',
                                    }}
                                    formatter={(value) => {
                                        if (value == null || typeof value !== 'number') return ['無資料', '心情'];
                                        const moods: MoodType[] = ['terrible', 'bad', 'okay', 'good', 'amazing'];
                                        const mood = moods[value - 1];
                                        if (!mood) return ['未知', '心情'];
                                        return [MOOD_CONFIG[mood]?.emoji + ' ' + MOOD_CONFIG[mood]?.label, '心情'];
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="url(#gradient)"
                                    strokeWidth={2}
                                    dot={false}
                                    connectNulls={false}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {/* 心情分佈 */}
            {moodDistribution.length > 0 && (
                <motion.div
                    className="chart-container mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-sm text-gray-400 mb-4">心情分佈</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-32 h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={moodDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={35}
                                        outerRadius={55}
                                        dataKey="value"
                                    >
                                        {moodDistribution.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-1 space-y-2">
                            {moodDistribution.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm">
                                        {item.emoji} {item.name}
                                    </span>
                                    <span className="text-sm text-gray-400 ml-auto">
                                        {item.value} ({Math.round((item.value / stats.totalEntries) * 100)}%)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* 空狀態 */}
            {stats.totalEntries === 0 && (
                <motion.div
                    className="text-center py-12 text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className="text-4xl mb-2">📈</p>
                    <p>還沒有足夠的資料</p>
                    <p className="text-sm mt-1">開始寫日記後這裡會顯示統計</p>
                </motion.div>
            )}
        </div>
    );
}
