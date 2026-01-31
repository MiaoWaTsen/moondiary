import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '日曆 - Moodiary',
    description: '以日曆方式查看你的心情記錄',
};

export default function CalendarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
