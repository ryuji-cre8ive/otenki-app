import { fetchWeatherApi } from "openmeteo";
import { WHETHER_URL } from "./constants";

export const getWeatherData = async () => {
  const params = {
    latitude: 35.6895,
    longitude: 139.6917,
    hourly: "temperature_2m",
    forecast_days: 1,
  };
  const responses = await fetchWeatherApi(WHETHER_URL, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
  };
  return weatherData;
};
