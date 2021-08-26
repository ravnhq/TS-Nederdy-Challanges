// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
interface TemperatureReading {
  time: Date
  temperature: number
  city: string
}
interface TemperatureSummary {
  first: number
  last: number
  high: number
  low: number
  average: number
}

const processedReadings: TemperatureReading[] = [];

export function processReadings(readings: TemperatureReading[]): void {
  processedReadings.push(...readings);
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  let filteredReadings: TemperatureReading[] = [];

  filteredReadings = processedReadings.filter(
    (read) => (read.time.getTime() === date.getTime()) && (read.city === city),
  )

  if (filteredReadings.length !== 0) {
    const summary: TemperatureSummary = {
      first: filteredReadings[0].temperature,
      last: filteredReadings[filteredReadings.length - 1].temperature,
      high: filteredReadings[0].temperature,
      low: filteredReadings[0].temperature,
      average: 0,
    }

    filteredReadings.forEach((read) => {
      if (read.temperature < summary.low) {
        summary.low = read.temperature;
      }
      if (read.temperature > summary.high) {
        summary.high = read.temperature;
      }
      summary.average += read.temperature;
    })

    summary.average /= filteredReadings.length;

    return summary;
  } else {
    return null;
  }
}
