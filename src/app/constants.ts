export const BUST_SIZE_MAP = {
  A: 10,
  B: 12.5,
  C: 15,
  D: 17.5,
  E: 20,
  F: 22.5,
  G: 25,
  H: 27.5,
  I: 30,
  J: 32.5,
  K: 35,
  L: 37.5,
  M: 40,
} as const;

export type BustSize = keyof typeof BUST_SIZE_MAP;

export function getBustSizeFromMeasurement(
  measurement: number
): BustSize | undefined {
  const entries = Object.entries(BUST_SIZE_MAP);
  const closestEntry = entries.reduce((closest, [size, value]) => {
    return Math.abs(value - measurement) < Math.abs(closest[1] - measurement)
      ? [size, value]
      : closest;
  });
  return closestEntry[0] as BustSize;
}

export const WHETHER_URL = "https://api.open-meteo.com/v1/forecast";
