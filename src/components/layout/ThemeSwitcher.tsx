'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'dark') setTheme('light');
        else if (theme === 'light') setTheme('blue');
        else setTheme('dark');
    };

    const getIcon = () => {
        switch (theme) {
            case 'light': return <Sun className="w-5 h-5 text-yellow-500" />;
            case 'blue': return <CloudRain className="w-5 h-5 text-blue-400" />;
            default: return <Moon className="w-5 h-5 text-purple-400" />;
        }
    };

    const getLabel = () => {
        switch (theme) {
            case 'light': return '晨曦白';
            case 'blue': return '午夜藍';
            default: return '深空黑';
        }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="flex items-center gap-2 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/30 transition-colors"
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {getIcon()}
            <span className="text-xs font-medium text-gray-400">{getLabel()}</span>
        </motion.button>
    );
}
