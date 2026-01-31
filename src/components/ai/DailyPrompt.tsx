'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';

const PROMPTS = [
    "今天發生了什麼讓你意想不到的小事？",
    "如果今天是一部電影，標題會是什麼？",
    "最近有什麼事情讓你感到焦慮？寫下來釋放它。",
    "今天有吃到什麼好吃的東西嗎？",
    "描述一下今天天氣帶給你的感覺。",
    "今天有沒有哪一刻讓你覺得「活著真好」？",
    "如果可以對還是孩子的自己說一句話，今天你會說什麼？",
    "今天做的最棒的一個決定是什麼？",
    "寫下三個今天讓你感恩的人事物。",
    "最近的一首愛歌是什麼？為什麼喜歡？",
    "今天有沒有遇到什麼困難？你是怎麼面對的？",
    "如果明天是世界末日，今天你會做什麼？",
    "描述一個今天讓你印象深刻的聲音或氣味。",
    "今天有沒有幫助到別人，或是接受別人的幫助？",
    "最近有什麼讓你期待的事情嗎？",
    "寫下一個你現階段最想達成的目標。",
    "今天有沒有哪一刻讓你覺得自己很勇敢？",
    "如果可以擁有一種超能力來解決今天的某個煩惱，那會是什麼？",
    "今天哪一刻讓你笑得最開心？",
    "最近有沒有學到什麼新知識或冷知識？",
];

interface DailyPromptProps {
    onSelect?: (prompt: string) => void;
}

export default function DailyPrompt({ onSelect }: DailyPromptProps) {
    const [prompt, setPrompt] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        refreshPrompt();
    }, []);

    const refreshPrompt = () => {
        setIsRefreshing(true);
        // Random prompt logic
        const randomIndex = Math.floor(Math.random() * PROMPTS.length);
        setPrompt(PROMPTS[randomIndex]);
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <motion.div
            className="card bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-purple-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">每日靈感</span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        refreshPrompt();
                    }}
                    className={`text-gray-400 hover:text-white transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>

            <p className="text-lg font-medium text-gray-200 mb-4 min-h-[3.5rem] flex items-center">
                {prompt}
            </p>

            <button
                onClick={() => onSelect?.(prompt)}
                className="text-sm text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-1 group"
            >
                用這個開頭寫日記
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </motion.div>
    );
}
