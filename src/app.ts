/* eslint-disable no-console */
// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
// Motivation about https://neliosoftware.com/es/blog/uso-avanzado-de-typescript-parte-1/
//Estructure Dictionary of Dictionary
// the magic is Record in Partial
type Dictionary<K extends string, T> = Partial<Record<K, T>>
//dictionary
type dayTmperature = {
  time: string
  city: Dictionary<string, Array<number>>
}

const allDataTmp: { [key: string]: Dictionary<string, Array<number>> } = {}

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

// I sorting by time and after city
export function processReadings(readings: TemperatureReading[]): void {
  for (const data of readings) {
    const indextime: number = data.time.getTime()
    const city = data.city
    const tempe = data.temperature
    if (indextime in allDataTmp && city in allDataTmp[indextime])
      allDataTmp[indextime][city]?.push(tempe)
    else {
      if (!(indextime in allDataTmp)) {
        const tmp: Dictionary<string, Array<number>> = { [city]: [tempe] }
        allDataTmp[indextime] = tmp
      } else allDataTmp[indextime][city] = [tempe]
    }
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code

  const datecity = allDataTmp[date.getTime()][city]
  if (typeof datecity === 'object') {
    const tam = datecity['length']

    const result: TemperatureSummary = {
      first: datecity[0],
      last: datecity[tam - 1],
      high: Math.max(...datecity),
      low: Math.min(...datecity),
      average: datecity.reduce((a, b) => a + b, 0) / tam,
    }
    return result
  }
  return null
}
/* processReadings(example)
console.log(getTemperatureSummary(new Date('1/2/2021'), 'Utah'))
console.log(allDataTmp) */
