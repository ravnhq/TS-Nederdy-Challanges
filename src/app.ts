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

const dataLectures: TemperatureReading[] = []
export function processReadings(readings: TemperatureReading[]): void {
  dataLectures.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const filterTime = dataLectures.filter(
    (data: TemperatureReading) => data.time.getTime() === date.getTime(),
  )
  const filterCity = filterTime.filter(
    (data: TemperatureReading) => data.city === city,
  )
  const temperatureArray: number[] = []

  if (filterTime.length === 0 || filterCity.length === 0) return null

  filterCity.forEach((element: TemperatureReading) =>
    temperatureArray.push(element.temperature),
  )

  const sizeTemperatureArray = temperatureArray.length
  const average =
    temperatureArray.reduce(
      (previous: number, current: number) => previous + current,
    ) / sizeTemperatureArray

  const orderedTemperature = [...temperatureArray].sort((a, b) => a - b)

  return {
    first: temperatureArray[0],
    last: temperatureArray[sizeTemperatureArray - 1],
    high: orderedTemperature[sizeTemperatureArray - 1],
    low: orderedTemperature[0],
    average: average,
  }
}
