import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { zhTW } from 'date-fns/locale';

// 格式化日期顯示
export function formatDate(date: Date | string, formatStr: string = 'yyyy年M月d日'): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, formatStr, { locale: zhTW });
}

// 取得今天的日期字串 (YYYY-MM-DD)
export function getTodayString(): string {
    return format(new Date(), 'yyyy-MM-dd');
}

// 取得月份的所有日期
export function getMonthDays(date: Date): Date[] {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
}

// 檢查是否為今天
export function checkIsToday(date: Date): boolean {
    return isToday(date);
}

// 檢查是否為同一個月
export function checkIsSameMonth(date1: Date, date2: Date): boolean {
    return isSameMonth(date1, date2);
}

// 圖片壓縮
export async function compressImage(file: File, maxSize: number = 800): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > height && width > maxSize) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                } else if (height > maxSize) {
                    width = (width * maxSize) / height;
                    height = maxSize;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 統計用工具函數
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((result, item) => {
        const groupKey = String(item[key]);
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {} as Record<string, T[]>);
}
