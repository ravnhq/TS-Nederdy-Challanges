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
    temperatures.push(reading)
  }
  return
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const groupReadings = temperatures.reduce(
    (
      previousTemperature: { [key: string]: TemperatureReading[] },
      currentTemperature,
    ) => {
      const key = currentTemperature.city

      if (!previousTemperature[key]) {
        previousTemperature[key] = []
      }
      previousTemperature[key].push(currentTemperature)
      return previousTemperature
    },
    {},
  )
  const readFiltered = groupReadings[city]
  if (!groupReadings[city]) {
    return null
  }
  const datedReadings = readFiltered.filter(
    (datedReading: TemperatureReading) =>
      datedReading.time.toString() === date.toString(),
  )
  const temperaturesReading = datedReadings.map(
    (temperatureReading: TemperatureReading) => temperatureReading.temperature,
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
