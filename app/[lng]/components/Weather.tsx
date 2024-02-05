'use client';

import { useEffect, useState } from 'react';
import { getImagesByCodes } from '@/lib/utils/weather';
import { WeatherData } from '@/lib/utils/weather';

export default function Weather() {
  const userLattitude = '53.5502';
  const userLongitude = '9.9920';
  const [weatherData, setData] = useState<WeatherData>();
  const [isLoading, setLoading] = useState(true);
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${userLattitude}&longitude=${userLongitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&current_weather=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        const weatherImgs = getImagesByCodes(data.daily.weather_code);
        setImgSrcs(weatherImgs);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (weatherData) {
    return (
      <div>
        <div className="flex p-7 space-x-5">
          <img src={imgSrcs[0]} width="170px" height="170px" />
          <div className="text-2xl flex w-full justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-4xl text-right">
                {`${weatherData.current_weather.temperature}
                  ${weatherData.current_weather_units.temperature}`}
              </span>
              <span className="ml-1">
                {`Wind: ${weatherData.current_weather.windspeed}${weatherData.current_weather_units.windspeed}`}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span>{weatherData.daily.time[0]}</span>
              <span>Hamburg</span>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly	space-x-10">
          {imgSrcs.map((img, index) => {
            return (
              <div className="text-sm flex flex-col items-center space-y-1">
                <img
                  key={`${img}-${index}`}
                  src={img}
                  width="50px"
                  height="50px"
                />
                <div>
                  <span>{weatherData.daily.temperature_2m_min[index]}° / </span>
                  <span className="font-bold">
                    {weatherData.daily.temperature_2m_max[index]}°
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
