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

interface TemperatureArray {
  [key: string]: number[]
}

const summary: TemperatureArray = {}

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((element: TemperatureReading) => {
    const nameElement = `${element.city + element.time.toDateString()}`

    summary[nameElement] ??= []

    summary[nameElement].push(element.temperature)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const nameElement = `${city + date.toDateString()}`

  const onlyTemperatures = summary[nameElement]

  if (!summary[nameElement]) return null

  const count = onlyTemperatures.length

  return {
    first: onlyTemperatures[0],
    last: onlyTemperatures[count - 1],
    high: Math.max(...onlyTemperatures),
    low: Math.min(...onlyTemperatures),
    average:
      onlyTemperatures.reduce((acc: number, el: number) => acc + el) / count,
  }
}
