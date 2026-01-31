'use client';

import { useState, useCallback } from 'react';
import { WeatherData, LocationData } from '@/types';
import { getWeather } from '@/lib/weather';
import { getCurrentLocation } from '@/lib/location';

interface UseLocationWeatherReturn {
    weather: WeatherData | undefined;
    location: LocationData | undefined;
    isLoading: boolean;
    error: string | null;
    fetch: () => Promise<void>;
    setWeather: (weather: WeatherData | undefined) => void;
    setLocation: (location: LocationData | undefined) => void;
}

export function useLocationWeather(
    initialWeather?: WeatherData,
    initialLocation?: LocationData
): UseLocationWeatherReturn {
    const [weather, setWeather] = useState<WeatherData | undefined>(initialWeather);
    const [location, setLocation] = useState<LocationData | undefined>(initialLocation);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetch = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const loc = await getCurrentLocation();
            if (loc) {
                setLocation(loc);
                if (loc.coords) {
                    const w = await getWeather(loc.coords.lat, loc.coords.lng);
                    if (w) setWeather(w);
                }
            }
        } catch (err) {
            console.error('Failed to get location/weather:', err);
            setError('無法取得位置或天氣資訊');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        weather,
        location,
        isLoading,
        error,
        fetch,
        setWeather,
        setLocation,
    };
}
