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
  const temperatures = [] as number[]
  let avg = 0
  data.forEach((item) => {
    if (item.city === city && item.time.getTime() === item.time.getTime()) {
      temperatures.push(item.temperature)
      avg += item.temperature
    }
  })
  const temperaturesLength = temperatures.length
  if (!temperaturesLength) return null
  return {
    first: temperatures[0],
    last: temperatures[temperaturesLength - 1],
    high: Math.max(...temperatures),
    low: Math.min(...temperatures),
    average: +avg.toFixed(2),
  }
}
