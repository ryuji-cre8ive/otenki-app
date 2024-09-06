"use client";

import { Line } from "@ant-design/charts";
import { getWeatherData } from "./getdata";
import { useEffect, useState } from "react";
import { getBustSizeFromMeasurement, BustSize } from "./constants";

type WeatherData = {
  hourly: {
    time: Date[];
    temperature2m: Float32Array;
  };
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [bustSize, setBustSize] = useState<BustSize | undefined>(undefined);
  const [isCupSizeVisible, setIsCupSizeVisible] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const weather = await getWeatherData();
      setWeatherData(weather);

      if (weather && weather.hourly.temperature2m) {
        const temps = Array.from(weather.hourly.temperature2m);
        let maxDiff = 0;
        let peak = -Infinity;
        let valley = Infinity;

        for (let i = 1; i < temps.length - 1; i++) {
          if (temps[i] > temps[i - 1] && temps[i] > temps[i + 1]) {
            peak = Math.max(peak, temps[i]);
            valley = Math.min(...temps.slice(Math.max(0, i - 12), i));
            maxDiff = Math.max(maxDiff, peak - valley);
          }
        }

        const bustSize = getBustSizeFromMeasurement(
          Number(maxDiff.toFixed(1)) * 5
        );
        setBustSize(bustSize);
      }
    }
    fetchData();
  }, []);
  if (!weatherData) return <div>Loading...</div>;
  console.log(weatherData);

  const config = {
    data: weatherData.hourly.time.map((time, index) => ({
      time,
      temperature2m: weatherData.hourly.temperature2m[index],
    })),
    height: 400,
    xField: "time",
    yField: "temperature2m",
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:px-20 sm:pb-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full">
        <h1 className="text-4xl font-bold">
          <span className="text-blue-500">お天気</span> OPPAI
        </h1>
        <div className="w-full -mx-4 sm:mx-0">
          <Line {...config} className="w-full" />
        </div>
        <button
          className="text-sm bg-blue-500 text-white p-2 rounded-md"
          onClick={() => setIsCupSizeVisible(!isCupSizeVisible)}
        >
          カップ数を見る
        </button>
        <div className="flex flex-col gap-2">
          {isCupSizeVisible && bustSize && (
            <>
              <p className="text-xl">推定カップ数: {bustSize}</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
