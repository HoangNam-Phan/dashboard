import SunImg from '@/public/weather-images/sunny.png';
import SunWithCloudsImg from '@/public/weather-images/sunny-with-clouds.png';
import CloudyImg from '@/public/weather-images/cloudy.png';
import RainImg from '@/public/weather-images/rain.png';
import SnowImg from '@/public/weather-images/snow.png';
import RainWithSnowImg from '@/public/weather-images/rain-with-snow.png';
import ThunderImg from '@/public/weather-images/thunderstorm.png';
import FogImg from '@/public/weather-images/fog.png';
import { StaticImageData } from 'next/image';

type WeatherData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: {
    time: string;
    interval: string;
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
    weathercode: string;
  };
  current_weather: {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weather_code: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};

type WeatherCode = {
  codes: Array<number>;
  img: StaticImageData;
};

const weatherTypes: Array<WeatherCode> = [
  { codes: [0], img: SunImg },
  { codes: [1], img: SunWithCloudsImg },
  { codes: [2, 3], img: CloudyImg },
  { codes: [51, 53, 55, 61, 63, 65, 80, 81, 82], img: RainImg },
  { codes: [71, 73, 75, 77, 85, 86], img: SnowImg },
  { codes: [5, 8, 56, 57, 66, 67], img: RainWithSnowImg },
  { codes: [95, 96, 99], img: ThunderImg },
  { codes: [7, 45, 48], img: FogImg },
];

export function getImagesByCodes(codesToFind: number[]): string[] {
  const images = codesToFind.map((codeToFind) => {
    const weatherCode = weatherTypes.find((type) =>
      type.codes.includes(codeToFind)
    );
    return weatherCode?.img.src ?? '';
  });

  return images;
}

export type { WeatherData };
