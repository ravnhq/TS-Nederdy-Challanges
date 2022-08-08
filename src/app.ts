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

interface FullTemperatureSummary extends TemperatureSummary {
  readingsCounter: number
}

interface TemperatureSummariesByDate {
  [date: string]: FullTemperatureSummary
}

interface TemperatureSummariesByCity {
  [city: string]: TemperatureSummariesByDate
}

const tempertureSummaries: TemperatureSummariesByCity = {}

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((reading) => {
    const dateString = reading.time.toLocaleDateString()
    const city = reading.city
    const temperature = reading.temperature

    if (
      city in tempertureSummaries &&
      dateString in tempertureSummaries[city]
    ) {
      const temperatureSummary = tempertureSummaries[city][dateString]
      const readingsCounter = temperatureSummary.readingsCounter
      temperatureSummary.last = temperature
      temperatureSummary.low = Math.min(temperature, temperatureSummary.low)
      temperatureSummary.high = Math.max(temperature, temperatureSummary.high)
      temperatureSummary.average =
        (temperatureSummary.average * readingsCounter + temperature) /
        (readingsCounter + 1)
      tempertureSummaries[city][dateString] = temperatureSummary
      temperatureSummary.readingsCounter += 1
    } else {
      if (!tempertureSummaries[city]) {
        tempertureSummaries[city] = {}
      }

      const temperatureSummary: FullTemperatureSummary = {
        last: temperature,
        first: temperature,
        average: temperature,
        high: temperature,
        low: temperature,
        readingsCounter: 1,
      }

      tempertureSummaries[city][dateString] = temperatureSummary
    }
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const dateString = date.toLocaleDateString()
  if (city in tempertureSummaries && dateString in tempertureSummaries[city]) {
    return tempertureSummaries[city][dateString] as TemperatureSummary
  }
  return null
}
