import { getWeatherData } from "@/app/getdata";
import { Line } from "@ant-design/charts";
import { BustSize, getBustSizeFromMeasurement } from "@/app/constants";

async function fetchData() {
  return await getWeatherData();
}

interface WhetherChartProps {
  onChangeCupSize: (cupSize: BustSize | undefined) => void;
}

export const WhetherChart = async ({ onChangeCupSize }: WhetherChartProps) => {
  const data = await fetchData();
  if (data && data.hourly.temperature2m) {
    const temps = Array.from(data.hourly.temperature2m);
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

    const bustSize = getBustSizeFromMeasurement(Number(maxDiff.toFixed(1)) * 5);
    onChangeCupSize(bustSize);
    const config = {
      data: data.hourly.time.map((time, index) => ({
        time,
        temperature2m: data.hourly.temperature2m[index],
      })),
      xField: "time",
      yField: "temperature2m",
    };
    return (
      <>
        <div className="w-full -mx-4 sm:mx-0">
          <Line {...config} className="w-full" />
        </div>
      </>
    );
  }
};
