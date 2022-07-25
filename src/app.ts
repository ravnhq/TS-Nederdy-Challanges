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

let citiesTemperatureList: TemperatureReading[]

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  citiesTemperatureList = readings
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const temperaturesArray: Array<number> = []
  citiesTemperatureList.map((item) => {
    if (city == item.city) {
      if (date.getDate() === item.time.getDate()) {
        temperaturesArray.push(item.temperature)
      }
    }
  })
  const first = temperaturesArray[0]
  const last = temperaturesArray[temperaturesArray.length - 1]
  const high = Math.max(...temperaturesArray)
  const low = Math.min(...temperaturesArray)
  const average =
    temperaturesArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    ) / temperaturesArray.length

  if (temperaturesArray.length > 0) {
    return { first, last, high, low, average }
  } else {
    return null
  }
}
