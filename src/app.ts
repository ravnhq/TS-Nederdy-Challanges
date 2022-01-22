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

class Readings {
  static readings: TemperatureReading[]
}

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  Readings.readings = readings.slice()
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const readings = Readings.readings.slice()
  const readingsFilter = readings.filter(
    (value) => value.city == city && value.time.getTime() == date.getTime(),
  )
  if (readingsFilter.length == 0) {
    return null
  }
  const first: number = readingsFilter[0].temperature
  const last: number = readingsFilter[readingsFilter.length - 1].temperature
  let high: number = readingsFilter[0].temperature
  let low: number = readingsFilter[0].temperature
  let average = 0
  readingsFilter.forEach((curren) => {
    high < curren.temperature ? (high = curren.temperature) : high
    low > curren.temperature ? (low = curren.temperature) : low
    average += curren.temperature
  })
  average /= readingsFilter.length

  return {
    first: first,
    last: last,
    high: high,
    low: low,
    average: average,
  }
}
