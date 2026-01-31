'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Filter, X, ArrowUpDown, Calendar } from 'lucide-react';
import { useSearchEntries, useAllTags } from '@/hooks/useDiary';
import { useDebounce } from '@/hooks/useDebounce';
import { MoodType, MOOD_CONFIG, DiaryEntry } from '@/types';
import DiaryCard from '@/components/diary/DiaryCard';
import DiaryModal from '@/components/diary/DiaryModal';
import { SearchResultsSkeleton } from '@/components/common/Skeleton';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [moodFilter, setMoodFilter] = useState<MoodType | undefined>();
    const [tagFilter, setTagFilter] = useState<string | undefined>();
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

    // Debounce search query for better performance
    const debouncedQuery = useDebounce(query, 300);

    const results = useSearchEntries(
        debouncedQuery,
        moodFilter,
        tagFilter,
        startDate || undefined,
        endDate || undefined,
        sortOrder
    );
    const allTags = useAllTags();

    const clearFilters = useCallback(() => {
        setMoodFilter(undefined);
        setTagFilter(undefined);
        setStartDate('');
        setEndDate('');
        setQuery('');
        setSortOrder('desc');
    }, []);

    const toggleFilters = useCallback(() => {
        setShowFilters(prev => !prev);
    }, []);

    const toggleSortOrder = useCallback(() => {
        setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    }, []);

    const handleSelectEntry = useCallback((entry: DiaryEntry) => {
        setSelectedEntry(entry);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedEntry(null);
    }, []);

    const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, []);

    const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    }, []);

    const handleEndDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    }, []);

    const hasActiveFilters = useMemo(() => {
        return moodFilter || tagFilter || query || startDate || endDate;
    }, [moodFilter, tagFilter, query, startDate, endDate]);

    const isLoading = results === undefined && (debouncedQuery || hasActiveFilters);

    return (
        <div className="p-4 max-w-lg mx-auto">
            {/* 頭部 */}
            <motion.header
                className="text-center py-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold">🔍 搜尋</h1>
                <p className="text-gray-400 mt-1">找回過去的記憶</p>
            </motion.header>

            {/* 搜尋欄 */}
            <motion.div
                className="relative mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="搜尋日記內容..."
                    className="input pl-12 pr-12"
                />
                <button
                    onClick={toggleFilters}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded ${showFilters || hasActiveFilters
                        ? 'text-purple-400'
                        : 'text-gray-400'
                        }`}
                >
                    <Filter className="w-5 h-5" />
                </button>
            </motion.div>

            {/* 篩選器 */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        className="card mb-4 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {/* 日期篩選 */}
                        <div>
                            <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> 日期範圍
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    className="input text-sm py-1"
                                />
                                <span className="self-center text-gray-500">-</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    className="input text-sm py-1"
                                />
                            </div>
                        </div>

                        {/* 排序 */}
                        <div>
                            <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                                <ArrowUpDown className="w-4 h-4" /> 排序
                            </p>
                            <button
                                onClick={toggleSortOrder}
                                className="tag w-full justify-center"
                            >
                                {sortOrder === 'desc' ? '📅 日期：由新到舊' : '📅 日期：由舊到新'}
                            </button>
                        </div>

                        {/* 心情篩選 */}
                        <div>
                            <p className="text-sm text-gray-400 mb-2">心情</p>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(MOOD_CONFIG).map(([mood, config]) => (
                                    <button
                                        key={mood}
                                        onClick={() =>
                                            setMoodFilter(
                                                moodFilter === mood ? undefined : (mood as MoodType)
                                            )
                                        }
                                        className={`tag ${moodFilter === mood ? 'border-purple-400 bg-purple-500/20' : ''
                                            }`}
                                    >
                                        {config.emoji} {config.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 標籤篩選 */}
                        {allTags && allTags.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-400 mb-2">標籤</p>
                                <div className="flex flex-wrap gap-2">
                                    {allTags.slice(0, 10).map(({ tag, count }) => (
                                        <button
                                            key={tag}
                                            onClick={() =>
                                                setTagFilter(tagFilter === tag ? undefined : tag)
                                            }
                                            className={`tag ${tagFilter === tag ? 'border-purple-400 bg-purple-500/20' : ''
                                                }`}
                                        >
                                            #{tag}
                                            <span className="text-gray-500 ml-1">({count})</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 已啟用的篩選標籤 */}
            {hasActiveFilters && (
                <motion.div
                    className="flex flex-wrap items-center gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <span className="text-sm text-gray-400">篩選條件:</span>
                    {query && (
                        <span className="tag">
                            &quot;{query}&quot;
                            <button onClick={() => setQuery('')} className="ml-1">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {startDate && (
                        <span className="tag">
                            {startDate} 起
                            <button onClick={() => setStartDate('')} className="ml-1">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {endDate && (
                        <span className="tag">
                            至 {endDate}
                            <button onClick={() => setEndDate('')} className="ml-1">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {moodFilter && (
                        <span className="tag">
                            {MOOD_CONFIG[moodFilter].emoji}
                            <button onClick={() => setMoodFilter(undefined)} className="ml-1">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    {tagFilter && (
                        <span className="tag">
                            #{tagFilter}
                            <button onClick={() => setTagFilter(undefined)} className="ml-1">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    )}
                    <button
                        onClick={clearFilters}
                        className="text-xs text-purple-400 hover:text-purple-300"
                    >
                        清除全部
                    </button>
                </motion.div>
            )}

            {/* 搜尋結果 */}
            <div className="space-y-3">
                {isLoading ? (
                    <SearchResultsSkeleton />
                ) : results && results.length > 0 ? (
                    <>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <p>找到 {results.length} 篇日記</p>
                            <button
                                onClick={toggleSortOrder}
                                className="flex items-center gap-1 hover:text-white"
                            >
                                <ArrowUpDown className="w-3 h-3" />
                                {sortOrder === 'desc' ? '新→舊' : '舊→新'}
                            </button>
                        </div>
                        {results.map((entry, index) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <DiaryCard
                                    entry={entry}
                                    onClick={() => handleSelectEntry(entry)}
                                />
                            </motion.div>
                        ))}
                    </>
                ) : (
                    <motion.div
                        className="text-center py-12 text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-4xl mb-2">🔮</p>
                        <p>{hasActiveFilters ? '找不到符合的日記' : '輸入關鍵字開始搜尋'}</p>
                    </motion.div>
                )}
            </div>

            {/* 日記詳情彈窗 */}
            {selectedEntry && (
                <DiaryModal
                    entry={selectedEntry}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
