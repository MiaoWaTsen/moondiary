import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { DiaryEntry } from '@/types';

export function useSync() {
    const { user } = useAuth();
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

    useEffect(() => {
        if (!user) return;

        // 初始同步
        syncData();

        // 設定定期同步 (每 5 分鐘)
        const interval = setInterval(syncData, 5 * 60 * 1000);

        // 監聽線上狀態
        window.addEventListener('online', syncData);

        return () => {
            clearInterval(interval);
            window.removeEventListener('online', syncData);
        };
    }, [user]);

    const syncData = async () => {
        if (!user || isSyncing) return;

        try {
            setIsSyncing(true);
            const syncState = await db.syncState.get('lastSync');
            const lastSync = syncState?.timestamp || 0;
            const now = Date.now();

            // 1. PUSH: 上傳本地修改 (synced = 0)
            const dirtyEntries = await db.entries.where('synced').equals(0).toArray();

            if (dirtyEntries.length > 0) {
                const { error } = await supabase.from('entries').upsert(
                    dirtyEntries.map(entry => ({
                        id: entry.id,
                        user_id: user.id,
                        date: entry.date,
                        title: entry.title,
                        content: entry.content,
                        mood: entry.mood,
                        tags: entry.tags,
                        photos: entry.photos,
                        weather: entry.weather,
                        location: entry.location,
                        updated_at: new Date().toISOString(),
                    }))
                );

                if (error) throw error;

                // 標記為已同步
                await db.transaction('rw', db.entries, async () => {
                    for (const entry of dirtyEntries) {
                        await db.entries.update(entry.id, { synced: 1 });
                    }
                });
            }

            // 2. PULL: 下載雲端更新
            const { data: cloudEntries, error: fetchError } = await supabase
                .from('entries')
                .select('*')
                .gt('updated_at', new Date(lastSync).toISOString());

            if (fetchError) throw fetchError;

            if (cloudEntries && cloudEntries.length > 0) {
                await db.transaction('rw', db.entries, async () => {
                    for (const cloudEntry of cloudEntries) {
                        // 轉換格式並存入
                        const localEntry: DiaryEntry & { synced?: number } = {
                            id: cloudEntry.id,
                            date: cloudEntry.date,
                            title: cloudEntry.title,
                            content: cloudEntry.content,
                            mood: cloudEntry.mood,
                            tags: cloudEntry.tags || [],
                            photos: cloudEntry.photos || [],
                            weather: cloudEntry.weather,
                            location: cloudEntry.location,
                            createdAt: new Date(cloudEntry.created_at),
                            updatedAt: new Date(cloudEntry.updated_at),
                            synced: 1, // 來自雲端，視為已同步
                        };
                        await db.entries.put(localEntry);
                    }
                });
            }

            // 更新最後同步時間
            await db.syncState.put({ id: 'lastSync', timestamp: now });
            setLastSyncTime(new Date(now));

        } catch (error) {
            console.error('Sync failed:', error);
        } finally {
            setIsSyncing(false);
        }
    };

    return { isSyncing, lastSyncTime, syncNow: syncData };
}
