/* eslint-disable no-console */
// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
// Motivation about https://neliosoftware.com/es/blog/uso-avanzado-de-typescript-parte-1/
//Estructure Dictionary of Dictionary
// the magic is Record in Partial
type Dictionary<K extends string, T> = Partial<Record<K, T>>

const allDataTmp: { [key: number]: Dictionary<string, Array<number>> } = {}
const infinite = 1000000000000
/* const example = [
  {
    time: new Date('1/3/2021'),
    temperature: 8,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 10,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 9,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 12,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 11,
    city: 'Utah',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 15,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 10,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 11,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 9,
    city: 'New York',
  },
  {
    time: new Date('3/13/2021'),
    temperature: 16,
    city: 'New York',
  },
  {
    time: new Date('3/13/2021'),
    temperature: 10,
    city: 'Utah',
  },
  {
    time: new Date('3/13/2021'),
    temperature: 1,
    city: 'Utah',
  },
] */

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

// I am storing by time and after city
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
function getHightLowSum(arrayData: Array<number>) {
  // calculation of high, low, average
  // instead calculate three times for(Math.min,Math.max) I going do one for
  let sumAll = 0
  let low = infinite
  let high = -infinite
  for (const tmp of arrayData) {
    if (high < tmp) high = tmp
    if (low > tmp) low = tmp
    sumAll += tmp
  }
  return [high, low, sumAll]
}

function temperatureDay(date: Date) {
  const daydata = allDataTmp[date.getTime()]
  let previousMin = infinite
  let previousMax = -infinite

  Object.keys(daydata).forEach((key) => {
    const value = daydata[key]
    if (typeof value === 'object') {
      //calculate for each city the low  and high temperature
      //getHightLowSum return [high, low, sumAll]
      const dataHLS = getHightLowSum(value)
      //compare the low and highest temperature of all city
      if (previousMax < dataHLS[0]) previousMax = dataHLS[0]
      if (previousMin > dataHLS[1]) previousMin = dataHLS[1]
    }
  })
  console.log(`The minimal by day ${previousMin}`)
  console.log(`The maximum by day ${previousMax}`)
  return [previousMin, previousMax]
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code

  const datecity = allDataTmp[date.getTime()][city]
  if (typeof datecity === 'object') {
    const tam = datecity['length']
    /// Get Array[high,low,sumalldata]
    const dataHLS = getHightLowSum(datecity)
    const result: TemperatureSummary = {
      first: datecity[0],
      last: datecity[tam - 1],
      high: dataHLS[0],
      low: dataHLS[1],
      average: dataHLS[2] / tam,
    }

    return result
  }
  return null
}
/* processReadings(example)
console.log(getTemperatureSummary(new Date('1/2/2021'), 'Utah'))
console.log(allDataTmp)
console.log(temperatureDay(new Date('1/2/2021'))) */
