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

let temperatureData: TemperatureReading[]
export function processReadings(readings: TemperatureReading[]): void {
  temperatureData = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const foundCity = temperatureData.find(
    (item: TemperatureReading) => item.city === city,
  )
  if (foundCity === undefined) return null

  const cityTemperatureReadings: TemperatureReading[] = temperatureData.filter(
    (item: TemperatureReading) =>
      item.city === city && item.time.getDay() === date.getDay(),
  )
  const cityTemperatures: number[] = cityTemperatureReadings.map(
    (item: TemperatureReading) => item.temperature,
  )

  const firstTemp: number = cityTemperatures[0]
  const lastTemp: number = cityTemperatures.slice(-1)[0]
  const highTemp: number = Math.max(...cityTemperatures)
  const lowTemp: number = Math.min(...cityTemperatures)
  const averageTemp: number =
    cityTemperatures.reduce(
      (total: number, temperature: number) => total + temperature,
    ) / cityTemperatures.length

  return {
    first: firstTemp,
    last: lastTemp,
    high: highTemp,
    low: lowTemp,
    average: averageTemp,
  }
}
