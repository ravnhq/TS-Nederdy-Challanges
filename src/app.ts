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
  // const reduceFunction = (
  //   accu: { [index: string]: TemperatureReading[] },
  //   curr: TemperatureReading,
  // ) => {
  //   const res = [...(accu[curr.city] ?? []), curr]
  //   return { ...accu, [curr.city]: res }
  // }

  // const reduceFunction2 = (
  //   accu: { [index: string]: TemperatureReading[] },
  //   curr: TemperatureReading,
  // ) => {
  //   if (!accu[curr.city]) {
  //     return { ...accu, [curr.city]: [curr] }
  //   }
  //   return { ...accu, [curr.city]: [...accu[curr.city], curr] }
  // }
  // const grouped = readings.reduce<{ [index: string]: TemperatureReading[] }>(
  //   reduceFunction2,
  //   Object.create(null),
  // )
  readingsGlobal = readings
  return
}
export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  //let filter = readingsGlobal.filter((data) => data.city === city)
  // let filter2 = readingsGlobal.filter(
  //   (data) => data.time.getTime() === date.getTime(),
  // )
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
