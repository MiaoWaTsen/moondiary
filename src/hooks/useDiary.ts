'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { DiaryEntry, MoodType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// 取得所有日記
export function useAllEntries() {
    return useLiveQuery(() => db.entries.orderBy('date').reverse().toArray(), []);
}

// 取得特定日期的日記
export function useEntryByDate(date: string) {
    return useLiveQuery(() => db.entries.where('date').equals(date).first(), [date]);
}

// 取得特定月份的日記
export function useEntriesByMonth(year: number, month: number) {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-31`;

    return useLiveQuery(
        () => db.entries.where('date').between(startDate, endDate, true, true).toArray(),
        [year, month]
    );
}

// 取得最近 N 天的日記
export function useRecentEntries(days: number = 7) {
    return useLiveQuery(async () => {
        const entries = await db.entries.orderBy('date').reverse().limit(days).toArray();
        return entries;
    }, [days]);
}

// 建立或更新日記
export async function saveEntry(entry: Partial<DiaryEntry> & { date: string }): Promise<string> {
    const now = new Date();

    // 檢查是否已有該日期的日記
    const existing = await db.entries.where('date').equals(entry.date).first();

    if (existing) {
        // 更新
        await db.entries.update(existing.id, {
            ...entry,
            updatedAt: now,
        });
        return existing.id;
    } else {
        // 建立新的
        const newEntry: DiaryEntry = {
            id: uuidv4(),
            createdAt: now,
            updatedAt: now,
            date: entry.date,
            title: entry.title || '',
            content: entry.content || '',
            photos: entry.photos || [],
            mood: entry.mood || 'okay',
            moodNote: entry.moodNote,
            tags: entry.tags || [],
            weather: entry.weather,
            location: entry.location,
        };

        await db.entries.add(newEntry);
        return newEntry.id;
    }
}

// 刪除日記
export async function deleteEntry(id: string): Promise<void> {
    await db.entries.delete(id);
}

// 搜尋日記
export function useSearchEntries(query: string, moodFilter?: MoodType, tagFilter?: string) {
    return useLiveQuery(async () => {
        let entries = await db.entries.toArray();

        // 文字搜尋
        if (query) {
            const lowerQuery = query.toLowerCase();
            entries = entries.filter(
                (e) =>
                    e.title.toLowerCase().includes(lowerQuery) ||
                    e.content.toLowerCase().includes(lowerQuery)
            );
        }

        // 心情篩選
        if (moodFilter) {
            entries = entries.filter((e) => e.mood === moodFilter);
        }

        // 標籤篩選
        if (tagFilter) {
            entries = entries.filter((e) => e.tags.includes(tagFilter));
        }

        return entries.sort((a, b) => b.date.localeCompare(a.date));
    }, [query, moodFilter, tagFilter]);
}

// 取得所有使用過的標籤
export function useAllTags() {
    return useLiveQuery(async () => {
        const entries = await db.entries.toArray();
        const tagCounts: Record<string, number> = {};

        entries.forEach((entry) => {
            entry.tags.forEach((tag) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        return Object.entries(tagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count);
    }, []);
}

// 取得統計資料
export function useStats() {
    return useLiveQuery(async () => {
        const entries = await db.entries.toArray();

        const moodCounts: Record<MoodType, number> = {
            terrible: 0,
            bad: 0,
            okay: 0,
            good: 0,
            amazing: 0,
        };

        let totalPhotos = 0;

        entries.forEach((entry) => {
            moodCounts[entry.mood]++;
            totalPhotos += entry.photos.length;
        });

        return {
            totalEntries: entries.length,
            moodCounts,
            totalPhotos,
            entries,
        };
    }, []);
}
