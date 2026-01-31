'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { useSearchEntries, useAllTags } from '@/hooks/useDiary';
import { MoodType, MOOD_CONFIG, DiaryEntry } from '@/types';
import DiaryCard from '@/components/diary/DiaryCard';
import DiaryModal from '@/components/diary/DiaryModal';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [moodFilter, setMoodFilter] = useState<MoodType | undefined>();
    const [tagFilter, setTagFilter] = useState<string | undefined>();
    const [showFilters, setShowFilters] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

    const results = useSearchEntries(query, moodFilter, tagFilter);
    const allTags = useAllTags();

    const clearFilters = () => {
        setMoodFilter(undefined);
        setTagFilter(undefined);
        setQuery('');
    };

    const hasActiveFilters = moodFilter || tagFilter || query;

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
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="搜尋日記內容..."
                    className="input pl-12 pr-12"
                />
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded ${showFilters || moodFilter || tagFilter
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
                {results && results.length > 0 ? (
                    <>
                        <p className="text-sm text-gray-400">
                            找到 {results.length} 篇日記
                        </p>
                        {results.map((entry, index) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <DiaryCard
                                    entry={entry}
                                    onClick={() => setSelectedEntry(entry)}
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
                    onClose={() => setSelectedEntry(null)}
                />
            )}
        </div>
    );
}
