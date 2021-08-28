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

const readValues :TemperatureReading[] = [];

export function processReadings(readings: TemperatureReading[]): void {
  readValues.push(...readings);
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {

  const summary: TemperatureSummary = {
    first: 0,
    last: 0,
    high: 0,
    low: 0,
    average: 0
  }

  const filteredValues = readValues.filter(
    (value) =>
      value.time.getTime() === new Date(date).getTime() && value.city === city,
  )

  const filteredValuesLength: number = filteredValues.length
  const temperatureArray: number[] = [];

  if (filteredValuesLength > 0) {
    summary.first = filteredValues[0].temperature
    summary.last = filteredValues[filteredValuesLength - 1].temperature

    for (let i = 0; i < filteredValues.length; i++) {
      temperatureArray.push(filteredValues[i].temperature);
    }

    summary.high = Math.max(...temperatureArray);
    summary.low = Math.min(...temperatureArray);
    summary.average = temperatureArray.reduce((a, b) => a + b, 0) / filteredValuesLength

    return summary
  } else {
    return null;
  }
}