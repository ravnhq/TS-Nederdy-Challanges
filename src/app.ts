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

let readingsGlobal: TemperatureReading[]
export function processReadings(readings: TemperatureReading[]): void {
  // add here your code

  readingsGlobal = readings
  return
}
export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const filter = readingsGlobal.filter(
    (data) => data.city === city && data.time.getTime() === date.getTime(),
  )
  if (filter.length < 1) {
    return null
  }
  const TemperatureSummary = {
    first: filter[0].temperature,
    last: filter.slice(-1)[0].temperature,
    high: filter.reduce(
      (accu, curr) => Math.max(accu, curr.temperature),
      -Infinity,
    ),
    low: filter.reduce(
      (accu, curr) => Math.min(accu, curr.temperature),
      Infinity,
    ),
    average:
      filter.reduce((accu, curr) => accu + curr.temperature, 0) / filter.length,
  }
  return TemperatureSummary
}
