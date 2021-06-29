/* eslint-disable prefer-const */
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

const summaryTemperature: { [item: string]: { [day: string]: number[] } } = {}

export function processReadings(readings: TemperatureReading[]): void {
  for (const read of readings) {
    if (read.city in summaryTemperature) {
      if (read.time.toDateString() in summaryTemperature[read.city]) {
        summaryTemperature[read.city][read.time.toDateString()].push(
          read.temperature,
        )
      } else {
        summaryTemperature[read.city][read.time.toDateString()] = [
          read.temperature,
        ]
      }
    } else {
      summaryTemperature[read.city] = {
        [read.time.toDateString()]: [read.temperature],
      }
    }
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  if (
    city in summaryTemperature &&
    date.toDateString() in summaryTemperature[city]
  ) {
    let values = summaryTemperature[city][date.toDateString()]
    let high = values.reduce((a, b) => (a > b ? a : b))
    let low = values.reduce((a, b) => (a < b ? a : b))
    let average =
      values.reduce(
        (acumulator: number, currentValue: number) => acumulator + currentValue,
      ) / values.length
    let summary: TemperatureSummary = {
      first: values[0],
      last: values[values.length - 1],
      high,
      low,
      average,
    }
    return summary
  }
  return null
}
