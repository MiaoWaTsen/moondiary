'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronRight } from 'lucide-react';
import { useRecentEntries, useEntryByDate } from '@/hooks/useDiary';
import { getTodayString, formatDate } from '@/lib/utils';
import { DiaryEntry, MOOD_CONFIG } from '@/types';
import DiaryCard from '@/components/diary/DiaryCard';
import DiaryEditor from '@/components/diary/DiaryEditor';
import DiaryModal from '@/components/diary/DiaryModal';
import ThemeSwitcher from '@/components/layout/ThemeSwitcher';
import DailyPrompt from '@/components/ai/DailyPrompt';
import { DiaryCardSkeleton } from '@/components/common/Skeleton';

export default function HomePage() {
  const today = getTodayString();
  const todayEntry = useEntryByDate(today);
  const recentEntries = useRecentEntries(5);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [editorInitialContent, setEditorInitialContent] = useState('');

  const now = useMemo(() => new Date(), []);
  const greeting = useMemo(() => getGreeting(now.getHours()), [now]);

  const handlePromptSelect = useCallback((prompt: string) => {
    setEditorInitialContent(`Q: ${prompt}\n\nA: `);
    setShowEditor(true);
  }, []);

  const handleOpenEditor = useCallback(() => {
    setShowEditor(true);
  }, []);

  const handleCloseEditor = useCallback(() => {
    setShowEditor(false);
  }, []);

  const handleSelectEntry = useCallback((entry: DiaryEntry) => {
    setSelectedEntry(entry);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEntry(null);
  }, []);

  // Filter out today's entry from recent entries
  const filteredRecentEntries = useMemo(() => {
    if (!recentEntries) return null;
    return recentEntries.filter((e) => e.date !== today).slice(0, 5);
  }, [recentEntries, today]);

  const isLoading = recentEntries === undefined;

  return (
    <div className="p-4 max-w-lg mx-auto relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher />
      </div>

      {/* 頭部 - 日期和問候 */}
      <motion.header
        className="text-center py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-gray-400 text-sm">{formatDate(now, 'yyyy 年 M 月 d 日 EEEE')}</p>
        <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {greeting}
        </h1>
        <p className="text-gray-400 text-sm mt-3 opacity-80 font-light">
          讓記憶回歸本真，讓紀錄成為享受
        </p>
      </motion.header>

      {/* 每日靈感 */}
      {!todayEntry && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DailyPrompt onSelect={handlePromptSelect} />
        </motion.div>
      )}

      {/* 今日狀態 */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {todayEntry ? (
          <div
            className="card cursor-pointer"
            onClick={() => handleSelectEntry(todayEntry)}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{MOOD_CONFIG[todayEntry.mood].emoji}</span>
              <div>
                <p className="font-medium">{todayEntry.title || '今天的日記'}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {todayEntry.content?.substring(0, 50) || '點擊查看詳情'}
                  {todayEntry.content && todayEntry.content.length > 50 && '...'}
                </p>
              </div>
              <ChevronRight className="ml-auto text-gray-500" />
            </div>
          </div>
        ) : (
          <motion.button
            className="card w-full text-left group"
            onClick={handleOpenEditor}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-purple-300">開始記錄今天</p>
                <p className="text-sm text-gray-400 mt-1">寫下今天的心情和故事</p>
              </div>
            </div>
          </motion.button>
        )}
      </motion.section>

      {/* 編輯器彈窗 */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-full p-4 py-8">
              <div className="max-w-lg mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">✍️ 寫日記</h2>
                  <button
                    onClick={handleCloseEditor}
                    className="btn btn-secondary text-sm"
                  >
                    關閉
                  </button>
                </div>
                <DiaryEditor
                  entry={todayEntry || undefined}
                  date={today}
                  initialContent={editorInitialContent}
                  onSave={handleCloseEditor}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 最近日記 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-300">最近的日記</h2>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <DiaryCardSkeleton />
            <DiaryCardSkeleton />
            <DiaryCardSkeleton />
          </div>
        ) : filteredRecentEntries && filteredRecentEntries.length > 0 ? (
          <div className="space-y-3">
            {filteredRecentEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <DiaryCard
                  entry={entry}
                  onClick={() => handleSelectEntry(entry)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-4xl mb-2">📔</p>
            <p>還沒有日記</p>
            <p className="text-sm mt-1">開始記錄你的第一篇吧！</p>
          </div>
        )}
      </motion.section>

      {/* 日記詳情彈窗 */}
      {selectedEntry && (
        <DiaryModal
          entry={selectedEntry}
          onClose={handleCloseModal}
        />
      )}

      {/* 浮動新增按鈕 */}
      {todayEntry && (
        <motion.button
          className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
          onClick={handleOpenEditor}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.button>
      )}
    </div>
  );
}

function getGreeting(hour: number): string {
  if (hour < 6) return '夜深了 🌙';
  if (hour < 12) return '早安 ☀️';
  if (hour < 18) return '午安 🌤️';
  return '晚安 🌙';
}
