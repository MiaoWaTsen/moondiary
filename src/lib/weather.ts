import { WeatherData } from '@/types';

// 使用 Open-Meteo API (免費無需 API Key)
export async function getWeather(lat: number, lng: number): Promise<WeatherData | null> {
    try {
        console.log('Fetching weather for:', lat, lng);

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=auto`
        );

        if (!response.ok) {
            console.error('Weather API failed:', response.status);
            return null;
        }

        const data = await response.json();
        console.log('Weather response:', data);

        const current = data.current;

        if (!current) {
            console.error('No current weather data in response');
            return null;
        }

        // 轉換天氣代碼為條件
        const condition = weatherCodeToCondition(current.weather_code);

        return {
            temperature: Math.round(current.temperature_2m),
            condition: condition.name,
            icon: condition.icon,
        };
    } catch (error) {
        console.error('Failed to fetch weather:', error);
        return null;
    }
}

// WMO Weather Code 轉換
function weatherCodeToCondition(code: number): { name: string; icon: string } {
    if (code === 0) return { name: 'sunny', icon: '☀️' };
    if (code <= 3) return { name: 'partlyCloudy', icon: '⛅' };
    if (code <= 48) return { name: 'foggy', icon: '🌫️' };
    if (code <= 57) return { name: 'rainy', icon: '🌧️' };
    if (code <= 67) return { name: 'rainy', icon: '🌧️' };
    if (code <= 77) return { name: 'snowy', icon: '❄️' };
    if (code <= 82) return { name: 'rainy', icon: '🌧️' };
    if (code <= 86) return { name: 'snowy', icon: '❄️' };
    if (code >= 95) return { name: 'stormy', icon: '⛈️' };
    return { name: 'cloudy', icon: '☁️' };
}
