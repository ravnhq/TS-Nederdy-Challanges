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
  temperatures.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const temperatureSummary: TemperatureSummary = {
    first: 0,
    last: 0,
    high: 0,
    low: 0,
    average: 0,
  }

  const filteredTemperatures = temperatures.filter(
    (temp) =>
      temp.time.getTime() === new Date(date).getTime() && temp.city === city,
  )
  const filteredTempLegnth: number = filteredTemperatures.length

  if (filteredTempLegnth > 0) {
    temperatureSummary.first = filteredTemperatures[0].temperature
    temperatureSummary.last =
      filteredTemperatures[filteredTempLegnth - 1].temperature
  }

  filteredTemperatures.forEach((temperature, index) => {
    temperatureSummary.high = Math.max(
      temperature.temperature,
      temperatureSummary.high,
    )

    if (index === 0) {
      temperatureSummary.low = temperature.temperature
    } else {
      temperatureSummary.low = Math.min(
        temperatureSummary.low,
        temperature.temperature,
      )
    }

    if (index < filteredTempLegnth - 1) {
      temperatureSummary.average =
        temperatureSummary.average + temperature.temperature
    } else {
      temperatureSummary.average =
        (temperatureSummary.average + temperature.temperature) /
        filteredTempLegnth
    }
  })

  return filteredTempLegnth ? temperatureSummary : null
}
