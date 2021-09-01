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

interface ProcessedReading {
  city: string
  time: Date
  readings: number[]
}

const processedReadings: ProcessedReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((reading) => {
    const city: ProcessedReading | undefined = processedReadings.find(
      (processedReading) =>
        processedReading.city === reading.city &&
        processedReading.time.toDateString() === reading.time.toDateString(),
    )

    if (!city) {
      const firstReading: ProcessedReading = {
        city: reading.city,
        time: reading.time,
        readings: [reading.temperature],
      }

      processedReadings.push(firstReading)
    } else {
      city.readings.push(reading.temperature)
    }
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const foundCity: ProcessedReading | undefined = processedReadings.find(
    (processedReading) =>
      processedReading.city === city &&
      processedReading.time.toDateString() === date.toDateString(),
  )
  if (foundCity) {
    const temperatureSummary: TemperatureSummary = {
      first: foundCity.readings[0],
      last: foundCity.readings[foundCity.readings.length - 1],
      average: 0,
      high: -Infinity,
      low: Infinity,
    }

    const readingsSum = foundCity.readings.reduce(
      (prev: number, curr: number) => {
        temperatureSummary.high = Math.max(temperatureSummary.high, curr)
        temperatureSummary.low = Math.min(temperatureSummary.low, curr)
        return prev + curr
      },
      0,
    )

    temperatureSummary.average = readingsSum / foundCity.readings.length

    return temperatureSummary
  }

  return null
}
