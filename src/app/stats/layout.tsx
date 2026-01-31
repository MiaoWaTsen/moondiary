import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '統計分析 - Moodiary',
    description: '查看你的心情趨勢和統計數據',
};

export default function StatsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
