import { LocationData } from '@/types';

export async function getCurrentLocation(): Promise<LocationData | null> {
    return new Promise((resolve) => {
        if (typeof window === 'undefined' || !navigator.geolocation) {
            console.log('Geolocation not available');
            resolve(null);
            return;
        }

        console.log('Requesting geolocation...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log('Got coordinates:', latitude, longitude);

                // 反向地理編碼取得城市名稱
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=zh-TW`,
                        {
                            headers: {
                                'User-Agent': 'Moodiary/1.0 (diary app)',
                            },
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Geocoding response:', data);

                        // 台灣地址可能在不同欄位
                        const city =
                            data.address?.city ||
                            data.address?.town ||
                            data.address?.village ||
                            data.address?.county ||
                            data.address?.state_district ||
                            data.address?.municipality;

                        resolve({
                            city: city,
                            country: data.address?.country,
                            coords: { lat: latitude, lng: longitude },
                        });
                    } else {
                        console.error('Geocoding failed:', response.status);
                        resolve({
                            coords: { lat: latitude, lng: longitude },
                        });
                    }
                } catch (error) {
                    console.error('Geocoding error:', error);
                    resolve({
                        coords: { lat: latitude, lng: longitude },
                    });
                }
            },
            (error) => {
                console.error('Geolocation error:', error.code, error.message);
                resolve(null);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000 // 5 分鐘快取
            }
        );
    });
}
