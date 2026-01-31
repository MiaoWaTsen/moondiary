import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '搜尋 - Moodiary',
    description: '搜尋你的日記記錄',
};

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
