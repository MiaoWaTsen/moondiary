import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import AnimatedBg from '@/components/layout/AnimatedBg';

export const metadata: Metadata = {
  title: 'Moodiary - 記錄每一天的心情',
  description: '一款深色質感的個人日記應用，記錄心情、照片和生活點滴',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body>
        <AnimatedBg />
        <main className="page-content">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
