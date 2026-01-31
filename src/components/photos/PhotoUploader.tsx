'use client';

import { useState, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, X, Camera } from 'lucide-react';
import { Photo } from '@/types';
import { compressImage } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

interface PhotoUploaderProps {
    photos: Photo[];
    onChange: (photos: Photo[]) => void;
    maxPhotos?: number;
}

function PhotoUploader({ photos, onChange, maxPhotos = 9 }: PhotoUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(async (files: FileList | null) => {
        if (!files) return;

        const newPhotos: Photo[] = [...photos];

        for (let i = 0; i < files.length && newPhotos.length < maxPhotos; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) continue;

            const data = await compressImage(file);
            newPhotos.push({
                id: uuidv4(),
                data,
            });
        }

        onChange(newPhotos);
    }, [photos, maxPhotos, onChange]);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        await handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const removePhoto = useCallback((id: string) => {
        onChange(photos.filter((p) => p.id !== id));
    }, [photos, onChange]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    }, [handleFiles]);

    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    return (
        <div className="space-y-4">
            {/* 上傳區域 */}
            <motion.div
                className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${isDragging
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-600 hover:border-purple-400'
                    }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
                whileHover={{ scale: 1.01 }}
                animate={{
                    borderColor: isDragging ? 'rgb(139, 92, 246)' : undefined,
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleInputChange}
                />

                <motion.div
                    animate={{ y: isDragging ? -5 : 0 }}
                    className="flex flex-col items-center gap-2"
                >
                    {isDragging ? (
                        <Camera className="w-10 h-10 text-purple-400" />
                    ) : (
                        <ImagePlus className="w-10 h-10 text-gray-400" />
                    )}
                    <p className="text-sm text-gray-400">
                        {isDragging ? '放開以上傳' : '點擊或拖放照片'}
                    </p>
                    <p className="text-xs text-gray-500">
                        最多 {maxPhotos} 張照片
                    </p>
                </motion.div>
            </motion.div>

            {/* 照片預覽 */}
            <AnimatePresence>
                {photos.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="photo-grid"
                    >
                        {photos.map((photo) => (
                            <motion.div
                                key={photo.id}
                                className="photo-item group"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                layout
                            >
                                <img
                                    src={photo.data}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                />
                                <motion.button
                                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removePhoto(photo.id);
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-4 h-4 text-white" />
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default memo(PhotoUploader);
