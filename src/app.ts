import { TemperatureReading, TemperatureSummary } from './interfaces'

let userReading: TemperatureSummary[]
let readingsCopy: TemperatureReading[]

export function processReadings(readings: TemperatureReading[]) {
  readingsCopy = readings.slice()
}

export function getTemperatureSummary(date: Date, city: string) {
  userReading = []
  const formattedDate = date.toString()
  const cityArray = filterBy(readingsCopy, 'city', city)
  const dateArray = filterBy(cityArray, 'time', formattedDate)
  processDailyReading(dateArray)
  if (userReading.length) {
    return userReading[0]
  } else {
    return null
  }
}

function filterBy(array: TemperatureReading[], property: any, userParam: any) {
  return array.filter(
    (element) =>
      element[property as keyof TemperatureReading].toString() === userParam,
  )
}

function processDailyReading(array: TemperatureReading[]) {
  if (!array.length) {
    return
  }
  const temperatureSummary = {
    first: 0,
    last: 0,
    high: 0,
    low: 0,
    average: 0,
  }
  Object.keys(temperatureSummary).forEach(
    (value) =>
      (temperatureSummary[value as keyof typeof temperatureSummary] =
        array[0].temperature),
  )
  if (array.length > 1) {
    temperatureSummary.last = array[array.length - 1].temperature
    let total = 0
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      total += element.temperature
      if (element.temperature > temperatureSummary.high) {
        temperatureSummary.high = element.temperature
      }
      if (element.temperature < temperatureSummary.low) {
        temperatureSummary.low = element.temperature
      }
      temperatureSummary.average = total / array.length
    }
  }
  userReading.push(temperatureSummary)
}
