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
const temperatureReadings: Array<TemperatureReading> = []

export function processReadings(readings: TemperatureReading[]): void {
  temperatureReadings.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const ZERO_WAITING_ASSIGNATION = 0
  const filteredReadings: Array<TemperatureReading> =
    temperatureReadings.filter((temperatureReading) =>
      isSameDateAndCity(temperatureReading, date, city),
    )
  if (filteredReadings.length === 0) return null
  const temperatureArray: Array<number> = []
  const temperatureSummary: TemperatureSummary = filteredReadings.reduce(
    (
      acc: TemperatureSummary,
      temperatureReading: TemperatureReading,
      index: number,
    ) => {
      temperatureArray.push(temperatureReading.temperature)
      if (index === 0) {
        acc.high = temperatureReading.temperature
        acc.first = temperatureReading.temperature
        acc.last = temperatureReading.temperature
        acc.high = temperatureReading.temperature
        acc.low = temperatureReading.temperature
      }
      if (index === filteredReadings.length - 1) {
        acc.last = temperatureReading.temperature
        acc.average =
          temperatureArray.reduce((acc, elm) => acc + elm, 0) /
          temperatureArray.length
      }
      if (temperatureReading.temperature > acc.high)
        acc.high = temperatureReading.temperature

      if (temperatureReading.temperature < acc.low)
        acc.low = temperatureReading.temperature

      return acc
    },
    {
      first: ZERO_WAITING_ASSIGNATION,
      last: ZERO_WAITING_ASSIGNATION,
      high: ZERO_WAITING_ASSIGNATION,
      low: ZERO_WAITING_ASSIGNATION,
      average: ZERO_WAITING_ASSIGNATION,
    },
  )
  return temperatureSummary

  function isSameDateAndCity(
    temperatureReading: TemperatureReading,
    date: Date,
    city: string,
  ): true | false {
    if (temperatureReading.city !== city) return false
    if (temperatureReading.time.getTime() !== date.getTime()) return false
    return true
  }
}
