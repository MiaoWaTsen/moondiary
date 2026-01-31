'use client';

import { motion } from 'framer-motion';

const shimmer = {
    animate: {
        backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear' as const,
    },
};

export function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <motion.div
            className={`bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] rounded ${className}`}
            animate={shimmer.animate}
            transition={shimmer.transition}
            style={style}
        />
    );
}

export function DiaryCardSkeleton() {
    return (
        <div className="card">
            <div className="flex gap-4">
                <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                <div className="flex-1 min-w-0 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2 pt-1">
                        <Skeleton className="h-5 w-12 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function StatsCardSkeleton() {
    return (
        <div className="card text-center">
            <Skeleton className="h-9 w-12 mx-auto mb-2" />
            <Skeleton className="h-3 w-16 mx-auto" />
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="chart-container">
            <Skeleton className="h-4 w-32 mb-4" />
            <div className="h-48 flex items-end justify-around gap-2 px-4">
                {[40, 65, 45, 80, 55, 70, 50, 60, 75, 45].map((h, i) => (
                    <Skeleton
                        key={i}
                        className="w-full rounded-t"
                        style={{ height: `${h}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

export function SearchResultsSkeleton() {
    return (
        <div className="space-y-3">
            <Skeleton className="h-4 w-24 mb-4" />
            <DiaryCardSkeleton />
            <DiaryCardSkeleton />
            <DiaryCardSkeleton />
        </div>
    );
}
