import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import AnimatedBg from '@/components/layout/AnimatedBg';
import OfflineBanner from '@/components/common/OfflineBanner';
import ServiceWorkerRegister from '@/components/common/ServiceWorkerRegister';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Moodiary - 記錄每一天的心情',
  description: '一款深色質感的個人日記應用，記錄心情、照片和生活點滴',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Moodiary',
  },
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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              <ServiceWorkerRegister />
              <OfflineBanner />
              <AnimatedBg />
              <AppShell>{children}</AppShell>
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
