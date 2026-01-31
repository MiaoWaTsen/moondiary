'use client';

import { motion } from 'framer-motion';
import { MoodType, MOOD_CONFIG } from '@/types';

interface MoodPickerProps {
    value: MoodType;
    onChange: (mood: MoodType) => void;
}

const moods: MoodType[] = ['terrible', 'bad', 'okay', 'good', 'amazing'];

export default function MoodPicker({ value, onChange }: MoodPickerProps) {
    return (
        <div className="mood-picker">
            {moods.map((mood) => {
                const config = MOOD_CONFIG[mood];
                const isActive = value === mood;

                return (
                    <motion.button
                        key={mood}
                        type="button"
                        className={`mood-btn ${isActive ? 'active' : ''}`}
                        onClick={() => onChange(mood)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            borderColor: isActive ? config.color : 'var(--border-color)',
                            boxShadow: isActive ? `0 0 25px ${config.color}50` : 'none',
                        }}
                        style={{
                            borderColor: isActive ? config.color : undefined,
                        }}
                    >
                        <motion.span
                            animate={{
                                scale: isActive ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {config.emoji}
                        </motion.span>
                    </motion.button>
                );
            })}
        </div>
    );
}
