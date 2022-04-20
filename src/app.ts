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

function groupBy(objectArray: [], property: string) {
  return objectArray.reduce(function (acc, obj) {
    const key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

let readingsByCityAndDate: {
  [x: string]: { [x: string]: TemperatureReading[] }
}

function storeByCityAndDate(readings: TemperatureReading[]) {
  readingsByCityAndDate = groupBy(readings, 'city')
  for (const city in readingsByCityAndDate) {
    const element = readingsByCityAndDate[city]
    readingsByCityAndDate[city] = groupBy(element, 'time')
  }
  return readingsByCityAndDate
}

function processDailyReading(readingsByCityAndDate) {
  let currentCity = ''
  let currentDate = ''
  Object.entries(readingsByCityAndDate).forEach(([city, dates]) => {
    currentCity = city
    const readings = Object.values(dates)
    readings.forEach((reading) => {
      currentDate = reading[0].time
      const temperatureSummary = {
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

function processReadings(readings: TemperatureReading[]) {
  storeByCityAndDate(readings)
  processDailyReading(readingsByCityAndDate)
}

processReadings(readings)

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
