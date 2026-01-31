import Dexie, { type EntityTable } from 'dexie';
import { DiaryEntry } from '@/types';

// 定義資料庫
const db = new Dexie('MoodiaryDB') as Dexie & {
    entries: EntityTable<DiaryEntry, 'id'>;
};

// 定義 schema
db.version(1).stores({
    entries: 'id, date, mood, *tags, createdAt',
});

export { db };
