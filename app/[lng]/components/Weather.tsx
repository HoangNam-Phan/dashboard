'use client';

import { useEffect, useState } from 'react';
import { getImagesByCodes } from '@/lib/utils/weather';
import { WeatherData } from '@/lib/utils/weather';
import Loading from './modules/Loading';
import Clock from './Clock';
import { motion } from 'framer-motion';

const weekdays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

function currentWeekDay(date: string) {
  const dateObject = new Date(date);
  const currentWeekday = dateObject.getDay();

  return weekdays[currentWeekday];
}

function currentWeekDayShort(weekday: string) {
  return weekday.substring(0, 3);
}

type WeatherProps = {
  t: (key: string) => string;
};

const weatherVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

export default function Weather({ t }: WeatherProps) {
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
    return <Loading />;
  }

  if (weatherData) {
    return (
      <div className="h-full flex flex-col justify-evenly divide-y-2">
        <div className="flex p-3 2xl:p-7 space-x-5">
          <motion.img
            variants={weatherVariant}
            transition={{ type: 'spring' }}
            src={imgSrcs[0]}
            width="170px"
            height="170px"
            className="size-20 lg:size-36"
          />
          <div className="flex w-full justify-between space-x-2">
            <div className="flex flex-col space-y-2">
              <span className="ml-1 text-xl md:text-2xl lg:text-3xl 2xl:text-right">
                {`${weatherData.current_weather.temperature}
                  ${weatherData.current_weather_units.temperature}`}
              </span>
              <span className="text-md md:text-lg xl:text-2xl ml-1">
                {`Wind: ${weatherData.current_weather.windspeed}${weatherData.current_weather_units.windspeed}`}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <Clock />
              <span className="font-semibold text-xl 2xl:text-3xl">
                {t(`weather.${[currentWeekDay(weatherData.daily.time[0])]}`)}
              </span>
              <span>{weatherData.daily.time[0]}</span>
              <span>Hamburg</span>
            </div>
          </div>
        </div>
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex justify-evenly space-x-5 pt-2 sm:pt-5"
        >
          {imgSrcs.map((img, index) => {
            return (
              <motion.div
                variants={weatherVariant}
                transition={{ type: 'spring' }}
                key={`${img}-${index}`}
                className="text-sm flex flex-col items-center space-y-1"
              >
                <img
                  src={img}
                  width="50px"
                  height="50px"
                  className="size-8 xl:size-12 2xl:size-14"
                />
                <div className="text-xs md:text-sm md text-center flex flex-col">
                  <div>
                    <span>
                      {weatherData.daily.temperature_2m_min[index]}°/{' '}
                    </span>
                    <span className="font-bold">
                      {weatherData.daily.temperature_2m_max[index]}°
                    </span>
                  </div>
                  <span>
                    {currentWeekDayShort(
                      t(
                        `weather.${[
                          currentWeekDay(weatherData.daily.time[index]),
                        ]}`
                      )
                    )}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    );
  }
}
