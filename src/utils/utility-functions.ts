import { TemperatureReading } from './interfaces'

export function groupByCity(objectArray: TemperatureReading[]) {
  return objectArray.reduce(function (
    accumulator: ReadingsByCityAndDate,
    object,
  ) {
    const city = object.city
    if (!accumulator[city]) {
      accumulator[city] = []
    }
    accumulator[city].push(object)
    return accumulator
  },
  {})
}

export function groupByDate(objectArray: TemperatureReading[]) {
  return objectArray.reduce(function (
    accumulator: ReadingsByCityAndDate,
    object,
  ) {
    const formattedDate = object.time.getTime()
    if (!accumulator[formattedDate]) {
      accumulator[formattedDate] = []
    }
    accumulator[formattedDate].push(object)
    return accumulator
  },
  {})
}

type ReadingsByCityAndDate = { [x: string]: TemperatureReading[] }
