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

interface TemperaturePerDay {
  [cityID: string]: {
    summary: TemperatureSummary
    count: number
    total: number
  }
}

const temps: TemperaturePerDay = {}

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  readings.forEach((reading: TemperatureReading) => {
    const { city, time, temperature } = reading
    const cityID = `${city}${time.getTime()}` // cityID is the name of the city + the time in ms, ex: Utah1232112345
    const citySum = temps[cityID]

    if (citySum) {
      const { summary } = citySum
      summary.low = Math.min(summary.low, temperature)
      summary.high = Math.max(summary.high, temperature)
      summary.last = temperature

      citySum.count += 1
      citySum.total += temperature

      summary.average = citySum.total / citySum.count
    } else {
      const newSumary: TemperatureSummary = {
        first: temperature,
        low: temperature,
        high: temperature,
        last: temperature,
        average: temperature,
      }

      temps[cityID] = {
        summary: newSumary,
        total: temperature,
        count: 1,
      }
    }
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const cityID = `${city}${date.getTime()}`

  return temps[cityID] ? temps[cityID].summary : null
}
