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

let summary: any

export function processReadings(readings: TemperatureReading[]): void {
  let nameElement = ''
  readings.forEach((element: TemperatureReading) => {
    nameElement = `${element.city + element.time.toDateString()}`

    if (!summary[nameElement]) summary[nameElement] = []

    summary[nameElement].push(element.temperature)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  let nameElement = `${city + date.toDateString()}`

  let onlyTemperatures = summary[nameElement]

  if (!summary[nameElement]) return null

  const count = onlyTemperatures.length

  let [first, ...rest] = [...onlyTemperatures]

  return {
    first: first,
    last: [...rest].pop(),
    high: Math.max(...onlyTemperatures),
    low: Math.min(...onlyTemperatures),
    average:
      onlyTemperatures.reduce((acc: number, el: number) => acc + el) / count,
  }
}
