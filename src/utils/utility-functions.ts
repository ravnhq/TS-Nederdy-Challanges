import { TemperatureReading, TemperatureSummary } from './interfaces'

export function groupBy(
  objectArray: TemperatureReading[],
  property: keyof TemperatureReading,
) {
  return objectArray.reduce(function (accumulator: MyType, object) {
    const key = object[property]
    if (!accumulator[key]) {
      accumulator[key] = []
    }
    accumulator[key].push(object)
    return accumulator
  }, {})
}

export function groupByCity(objectArray: TemperatureReading[]) {
  return objectArray.reduce(function (accumulator: MyType, object) {
    const key = object.city
    if (!accumulator[key]) {
      accumulator[key] = []
    }
    accumulator[key].push(object)
    return accumulator
  }, {})
}

type MyType = { [x: string]: TemperatureReading[] }

let readingsByCityAndDate: {
  [x: string]: { [x: string]: TemperatureSummary }
}

export function storeByCityAndDate(readings: TemperatureReading[]) {
  readingsByCityAndDate = groupBy(readings, 'city')
  for (const city in readingsByCityAndDate) {
    const element = readingsByCityAndDate[city]
    readingsByCityAndDate[city] = groupBy(element, 'time')
  }
  return readingsByCityAndDate
}

export function processDailyReading() {
  // FIX: iterating over object and modifying its properties at the same time
  // Suggestion: create a deep copy of object to use as storage instead
  let currentCity = ''
  let currentDate = ''
  Object.entries(readingsByCityAndDate).forEach(([city, dates]) => {
    currentCity = city
    const readings = Object.values(dates)
    readings.forEach((reading: any) => {
      currentDate = reading[0].time
      const temperatureSummary: TemperatureSummary = {
        first: 0,
        last: 0,
        high: 0,
        low: 0,
        average: 0,
      }
      Object.keys(temperatureSummary).forEach(
        (value) => (temperatureSummary[value] = reading[0].temperature),
      )
      if (reading.length > 2) {
        temperatureSummary.last = reading[reading.length - 1].temperature
        let total = 0
        for (let index = 0; index < reading.length; index++) {
          const element = reading[index]
          total += element.temperature
          if (element.temperature > temperatureSummary.high) {
            temperatureSummary.high = element.temperature
          }
          if (element.temperature < temperatureSummary.low) {
            temperatureSummary.low = element.temperature
          }
          temperatureSummary.average = total / reading.length
        }
      }
      readingsByCityAndDate[currentCity][currentDate] = temperatureSummary
    })
  })
}
