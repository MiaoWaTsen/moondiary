'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, MapPin, Cloud, Loader2 } from 'lucide-react';
import { DiaryEntry, MoodType, Photo, WeatherData, LocationData } from '@/types';
import { saveEntry, useAllTags } from '@/hooks/useDiary';
import { getWeather } from '@/lib/weather';
import { getCurrentLocation } from '@/lib/location';
import { getTodayString } from '@/lib/utils';
import MoodPicker from '@/components/mood/MoodPicker';
import PhotoUploader from '@/components/photos/PhotoUploader';
import TagInput from '@/components/tags/TagInput';

interface DiaryEditorProps {
    entry?: DiaryEntry;
    date?: string;
    onSave?: () => void;
}

export default function DiaryEditor({ entry, date, onSave }: DiaryEditorProps) {
    const [title, setTitle] = useState(entry?.title || '');
    const [content, setContent] = useState(entry?.content || '');
    const [mood, setMood] = useState<MoodType>(entry?.mood || 'okay');
    const [photos, setPhotos] = useState<Photo[]>(entry?.photos || []);
    const [tags, setTags] = useState<string[]>(entry?.tags || []);
    const [weather, setWeather] = useState<WeatherData | undefined>(entry?.weather);
    const [location, setLocation] = useState<LocationData | undefined>(entry?.location);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    const allTags = useAllTags();
    const tagSuggestions = allTags?.map((t) => t.tag) || [];

    const targetDate = date || getTodayString();

    // 自動抓取天氣和地點
    useEffect(() => {
        if (!weather && !location) {
            fetchLocationAndWeather();
        }
    }, []);

    const fetchLocationAndWeather = async () => {
        setIsLoadingLocation(true);
        try {
            const loc = await getCurrentLocation();
            if (loc) {
                setLocation(loc);
                if (loc.coords) {
                    const w = await getWeather(loc.coords.lat, loc.coords.lng);
                    if (w) setWeather(w);
                }
            }
        } catch (error) {
            console.error('Failed to get location/weather:', error);
        }
        setIsLoadingLocation(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveEntry({
                id: entry?.id,
                date: targetDate,
                title,
                content,
                mood,
                photos,
                tags,
                weather,
                location,
            });
            setShowSaved(true);
            setTimeout(() => setShowSaved(false), 2000);
            onSave?.();
        } catch (error) {
            console.error('Failed to save:', error);
        }
        setIsSaving(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* 心情選擇 */}
            <div className="card">
                <h3 className="text-lg font-medium mb-4 text-center">今天的心情</h3>
                <MoodPicker value={mood} onChange={setMood} />
            </div>

            {/* 標題 */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="今天的標題..."
                className="input text-xl font-medium"
            />

            {/* 內容 */}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="寫下今天的故事..."
                className="textarea"
            />

            {/* 照片上傳 */}
            <div className="card">
                <h3 className="text-sm font-medium mb-3 text-gray-400">📸 照片</h3>
                <PhotoUploader photos={photos} onChange={setPhotos} />
            </div>

            {/* 標籤 */}
            <div className="card">
                <h3 className="text-sm font-medium mb-3 text-gray-400">🏷️ 標籤</h3>
                <TagInput tags={tags} onChange={setTags} suggestions={tagSuggestions} />
            </div>

            {/* 天氣/地點 */}
            <div className="flex flex-wrap gap-3">
                {isLoadingLocation ? (
                    <div className="tag">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        載入中...
                    </div>
                ) : (
                    <>
                        {weather && (
                            <div className="tag">
                                <span>{weather.icon}</span>
                                {weather.temperature}°C
                            </div>
                        )}
                        {location?.city && (
                            <div className="tag">
                                <MapPin className="w-3 h-3" />
                                {location.city}
                            </div>
                        )}
                        {!weather && !location && (
                            <button
                                type="button"
                                onClick={fetchLocationAndWeather}
                                className="tag hover:border-purple-400 cursor-pointer"
                            >
                                <Cloud className="w-3 h-3" />
                                取得天氣/地點
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* 儲存按鈕 */}
            <motion.button
                onClick={handleSave}
                disabled={isSaving}
                className="btn btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {isSaving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : showSaved ? (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                    >
                        ✓ 已儲存
                    </motion.span>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        儲存日記
                    </>
                )}
            </motion.button>
        </motion.div>
    );
}
