'use server';

import { MoodType } from '@/types';

interface AnalysisResult {
    mood: MoodType;
    analysis: string;
    quote: string;
}

const MOCK_QUOTES = [
    "「每一個不曾起舞的日子，都是對生命的辜負。」—— 尼采",
    "「生活不是要等待風暴過去，而是要學會在雨中跳舞。」",
    "「你必須稍微試著去相信，這個世界依然美好。」",
    "「即使昨天不完美，今天依然是新的開始。」",
    "「溫柔對待自己，就像你溫柔對待世界一樣。」"
];

const MOCK_ANALYSIS = [
    "根據你的文字，我感覺到你今天的心情似乎有些起伏。這完全是正常的，允許自己有這樣的情緒。",
    "從這段日記中，我讀到了一種平靜與釋然。這是一個很棒的狀態。",
    "能在這段文字中感受到你的努力與堅持，請記得給自己一個大大的擁抱。",
    "這段紀錄充滿了生活的細節，正是這些微小的瞬間構成了我們的生命。",
    "似乎遇到了一些挑戰，但你的文字中依然透露著希望。"
];

export async function analyzeMood(text: string): Promise<AnalysisResult> {
    // 模擬 AI 思考時間
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 如果之後有 API KEY，這裡可以接 Gemini API
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
        // TODO: 實作真實的 API 呼叫
        console.log('Using Real API');
    }

    // 簡單的關鍵字檢測 (模擬)
    let mood: MoodType = 'okay';
    if (text.includes('開心') || text.includes('棒') || text.includes('成功')) mood = 'good';
    if (text.includes('難過') || text.includes('累') || text.includes('失敗')) mood = 'bad';
    if (text.includes('超好') || text.includes('愛') || text.includes('完美')) mood = 'amazing';
    if (text.includes('即使') || text.includes('生氣') || text.includes('討厭')) mood = 'terrible';

    return {
        mood,
        analysis: MOCK_ANALYSIS[Math.floor(Math.random() * MOCK_ANALYSIS.length)],
        quote: MOCK_QUOTES[Math.floor(Math.random() * MOCK_QUOTES.length)]
    };
}
