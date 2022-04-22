import { TemperatureReading, TemperatureSummary } from './utils/interfaces'
import {
  storeByCityAndDate,
  processDailyReading,
} from './utils/utility-functions'

let readingsByCityAndDate: {
  [x: string]: { [x: string]: TemperatureSummary }
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

// console.log(getTemperatureSummary(new Date('1/2/2021'), 'Utah'))
