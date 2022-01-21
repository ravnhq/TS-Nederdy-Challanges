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
let data: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  data = [...readings]
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const temperatureByCityAndDate = data.filter((item) => {
    return item.city === city && item.time.getTime() === date.getTime()
  })
  if (!temperatureByCityAndDate.length) return null
  const temperatures = temperatureByCityAndDate.map((item) => item.temperature)
  const avg =
    temperatures.reduce((number1, number2) => number1 + number2) /
    temperatures.length
  return {
    first: temperatureByCityAndDate[0].temperature,
    last: temperatureByCityAndDate[temperatureByCityAndDate.length - 1]
      .temperature,
    high: Math.max(...temperatures),
    low: Math.min(...temperatures),
    average: +avg.toFixed(2),
  }
}
