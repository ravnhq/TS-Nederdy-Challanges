// const example = [
//   {
//     time: new Date('1/3/2021'),
//     temperature: 8,
//     city: 'Utah',
//   },
//   {
//     time: new Date('1/2/2021'),
//     temperature: 10,
//     city: 'Utah',
//   },
//   {
//     time: new Date('1/2/2021'),
//     temperature: 9,
//     city: 'Utah',
//   },
//   {
//     time: new Date('1/2/2021'),
//     temperature: 12,
//     city: 'Utah',
//   },
//   {
//     time: new Date('1/2/2021'),
//     temperature: 11,
//     city: 'Utah',
//   },
//   {
//     time: new Date('3/12/2021'),
//     temperature: 15,
//     city: 'New York',
//   },
//   {
//     time: new Date('3/12/2021'),
//     temperature: 10,
//     city: 'New York',
//   },
//   {
//     time: new Date('3/12/2021'),
//     temperature: 11,
//     city: 'New York',
//   },
//   {
//     time: new Date('3/12/2021'),
//     temperature: 9,
//     city: 'New York',
//   },
//   {
//     time: new Date('3/13/2021'),
//     temperature: 16,
//     city: 'New York',
//   },
// ]

// function storeByCityAndDate(readings) {
//   readingsByCityAndDate = groupByCity(readings)
//   for (const city in readingsByCityAndDate) {
//     const date = readingsByCityAndDate[city]
//     readingsByCityAndDate[city] = groupByDate(date)
//   }
// }

// function processDailyReading() {
//   let currentCity = ''
//   let currentDate = ''
//   Object.entries(readingsByCityAndDate).forEach(([city, dates]) => {
//     currentCity = city
//     const readings = Object.values(dates)
//     readings.forEach((reading) => {
//       currentDate = reading[0].time
//       const temperatureSummary = {
//         first: 0,
//         last: 0,
//         high: 0,
//         low: 0,
//         average: 0,
//       }
//       Object.keys(temperatureSummary).forEach(
//         (value) => (temperatureSummary[value] = reading[0].temperature),
//       )
//       if (reading.length > 1) {
//         temperatureSummary.last = reading[reading.length - 1].temperature
//         let total = 0
//         for (let index = 0; index < reading.length; index++) {
//           const element = reading[index]
//           total += element.temperature
//           if (element.temperature > temperatureSummary.high) {
//             temperatureSummary.high = element.temperature
//           }
//           if (element.temperature < temperatureSummary.low) {
//             temperatureSummary.low = element.temperature
//           }
//           temperatureSummary.average = total / reading.length
//         }
//       }
//       readingsByCityAndDate[currentCity][currentDate] = temperatureSummary
//     })
//   })
// }

// let readingsByCityAndDate

// function processReadings(example) {
//   storeByCityAndDate(example)
//   processDailyReading()
// }

// processReadings(example)

// function getTemperatureSummary(date, city) {
//   const formattedDate = date.toString()
//   if (
//     readingsByCityAndDate.hasOwnProperty(city) &&
//     readingsByCityAndDate[city].hasOwnProperty(formattedDate)
//   ) {
//     return readingsByCityAndDate[city][formattedDate]
//   } else {
//     return null
//   }
// }

// console.log(getTemperatureSummary(new Date('1/2/2021'), 'Utah'))
// console.log(getTemperatureSummary(new Date('1/3/2021'), 'Utah'))
// console.log(getTemperatureSummary(new Date('3/12/2021'), 'New York'))
// console.log(getTemperatureSummary(new Date('3/13/2021'), 'New York'))
// console.log(getTemperatureSummary(new Date('1/25/2021'), 'Utah'))
// console.log(getTemperatureSummary(new Date('1/25/2021'), 'New York'))

// TS

import { TemperatureReading, TemperatureSummary } from './interfaces'

type groupedReadings = { [x: string]: TemperatureReading[] }

type readingsByDate = {
  [x: string]: { [x: string]: TemperatureReading[] }
}

let readingsByCityAndDate: {
  //final shape
  [x: string]: { [x: string]: TemperatureSummary }
}

function storeByCityAndDate(readings: TemperatureReading[]) {
  readingsByCityAndDate = groupByCity(readings) // groupedReadings type
  for (const city in readingsByCityAndDate) {
    const date = readingsByCityAndDate[city]
    readingsByCityAndDate[city] = groupByDate(date) // readingsByDate type
  }
}

function processDailyReading() {
  // FIX: iterating over object and modifying its properties at the same time
  // Suggestion: create a deep copy of object to use as storage instead
  // FIX: optimize processing algorithm
  let currentCity = ''
  let currentDate = ''
  Object.entries(readingsByCityAndDate).forEach(([city, dates]) => {
    currentCity = city
    const readings = Object.values(dates)
    readings.forEach((reading: TemperatureReading[]) => {
      currentDate = reading[0].time
      const temperatureSummary: TemperatureSummary = {
        first: 0,
        last: 0,
        high: 0,
        low: 0,
        average: 0,
      }
      Object.keys(temperatureSummary).forEach(
        (value) =>
          (temperatureSummary[value as keyof typeof temperatureSummary] =
            reading[0].temperature),
      )
      if (reading.length > 1) {
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

export function processReadings(readings: TemperatureReading[]): void {
  storeByCityAndDate(readings)
  processDailyReading()
}

// processReadings(readings)

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const formattedDate = date.toString()
  if (
    readingsByCityAndDate.hasOwnProperty(city) &&
    readingsByCityAndDate[city].hasOwnProperty(formattedDate)
  ) {
    return readingsByCityAndDate[city][formattedDate]
  } else {
    return null
  }
}

function groupByCity(objectArray: TemperatureReading[]) {
  return objectArray.reduce(function (accumulator: groupedReadings, object) {
    const city = object.city
    if (!accumulator[city]) {
      accumulator[city] = []
    }
    accumulator[city].push(object)
    return accumulator
  }, {})
}

function groupByDate(objectArray: TemperatureReading[]) {
  return objectArray.reduce(function (accumulator: groupedReadings, object) {
    const formattedTime = object.time.toString()
    if (!accumulator[formattedTime]) {
      accumulator[formattedTime] = []
    }
    accumulator[formattedTime].push(object)
    return accumulator
  }, {})
}
