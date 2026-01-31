// 心情類型
export type MoodType = 'terrible' | 'bad' | 'okay' | 'good' | 'amazing';

// 照片
export interface Photo {
    id: string;
    data: string; // Base64 encoded
    caption?: string;
}

// 天氣資料
export interface WeatherData {
    temperature: number;
    condition: string;
    icon: string;
}

// 地點資料
export interface LocationData {
    city?: string;
    country?: string;
    coords?: { lat: number; lng: number };
}

// 日記條目
export interface DiaryEntry {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    date: string; // YYYY-MM-DD

    title: string;
    content: string;
    photos: Photo[];

    mood: MoodType;
    moodNote?: string;

    tags: string[];

    weather?: WeatherData;
    location?: LocationData;
}

// 心情配置
export const MOOD_CONFIG: Record<MoodType, { emoji: string; label: string; color: string }> = {
    terrible: { emoji: '😢', label: '很糟', color: '#ef4444' },
    bad: { emoji: '😔', label: '不好', color: '#f97316' },
    okay: { emoji: '😐', label: '普通', color: '#eab308' },
    good: { emoji: '😊', label: '不錯', color: '#22c55e' },
    amazing: { emoji: '🤩', label: '超棒', color: '#8b5cf6' },
};

// 天氣圖標映射
export const WEATHER_ICONS: Record<string, string> = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    stormy: '⛈️',
    snowy: '❄️',
    foggy: '🌫️',
    windy: '💨',
    partlyCloudy: '⛅',
};

// API 回應類型
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// 同步狀態類型
export interface SyncState {
    isSyncing: boolean;
    lastSyncTime: Date | null;
    syncError: string | null;
}

// 統計資料類型
export interface StatsData {
    totalEntries: number;
    totalPhotos: number;
    moodCounts: Record<MoodType, number>;
    entries: DiaryEntry[];
}

// 標籤統計類型
export interface TagCount {
    tag: string;
    count: number;
}

// Toast 類型
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// 頁面元數據類型
export interface PageMeta {
    title: string;
    description: string;
}
