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

function groupBy(objectArray: object[], property: string) {
  return objectArray.reduce(function (acc, obj) {
    const key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

let readingsByCityAndDate;
let processedReadingsStorage;

function storeByCityAndDate(example) {
  readingsByCityAndDate = groupBy(example, 'city')
  for (const city in readingsByCityAndDate) {
    const element = readingsByCityAndDate[city]
    readingsByCityAndDate[city] = groupBy(element, 'time')
  }
}

function processDailyReading (readingsByCityAndDate) {
  for (const city in readingsByCityAndDate) {
    const cityReadings = readingsByCityAndDate[city]
    for (const date in cityReadings) {
      const dailyReading = cityReadings[date]
      // TODO: process dailyReading as per TemperatureSummary
    }
  }
}

export function processReadings(readings: TemperatureReading[]): void {
  storeByCityAndDate(example)
  processDailyReading(readingsByCityAndDate)
}

processReadings(readings)

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {}
