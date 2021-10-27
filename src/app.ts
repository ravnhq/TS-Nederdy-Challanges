/* eslint-disable no-console */
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

const temperatures: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  for (const reading of readings) {
    const readingInt: TemperatureReading = {
      time: reading.time,
      temperature: reading.temperature,
      city: reading.city,
    }
    temperatures.push(readingInt)
  }
  return
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const groupReadings = temperatures.reduce(
    (tmp: TemperatureReading | any, obj: TemperatureReading) =>
      Object.assign(tmp, {
        [obj.city]: (tmp[obj.city] || []).concat(obj),
      }),
    [],
  )
  const readFiltered = groupReadings[city]
  if (!groupReadings[city]) {
    return null
  }
  const datedReadings = readFiltered.filter(
    (item: TemperatureReading) => item.time.toString() === date.toString(),
  )
  const temperaturesReading = datedReadings.map(
    (item: TemperatureReading) => item.temperature,
  )
  const temperatureSummary: TemperatureSummary = {
    first: temperaturesReading[0],
    last: temperaturesReading[temperaturesReading.length - 1],
    high: Math.max(...temperaturesReading),
    low: Math.min(...temperaturesReading),
    average:
      temperaturesReading.reduce((a: number, b: number) => a + b, 0) /
      temperaturesReading.length,
  }
  return temperatureSummary
}
