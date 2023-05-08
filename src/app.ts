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

class ArrayProperties {
  array: Array<TemperatureReading> = []
  arrayProperties = { LENGTH_ARRAY: 0, FIRST_ITEM: 0, LAST_ITEM: 0 }

  constructor(array: Array<TemperatureReading>) {
    this.array = array
    this.arrayProperties = {
      LENGTH_ARRAY: array.length,
      FIRST_ITEM: 0,
      LAST_ITEM: array.length - 1,
    }
  }
}

const records: Array<TemperatureReading> = []

export function processReadings(readings: TemperatureReading[]): void {
  records.push(...readings)
  records.sort((a, b) => a.time.getTime() - b.time.getTime())
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //Filter elements by date and city
  const recordsOrderByCityAndDate: TemperatureReading[] = records.filter(
    (item) => item.time.getDate() === date.getDate() && item.city === city,
  )
  // If no exist any data return null
  if (!recordsOrderByCityAndDate.length) {
    return null
  }

  //Order records from high to lower temperature
  const recordsOrderByTemp = [...recordsOrderByCityAndDate].sort(
    (a, b) => b.temperature - a.temperature,
  )
  const prop = new ArrayProperties(recordsOrderByCityAndDate)

  //Calculate sum of all the temperature to will get the average
  const totalTemp = recordsOrderByCityAndDate.reduce(
    (total, current) => total + current.temperature,
    0,
  )

  //Building the response
  const summary: TemperatureSummary = {
    first:
      recordsOrderByCityAndDate[prop.arrayProperties.FIRST_ITEM].temperature,
    last: recordsOrderByCityAndDate[prop.arrayProperties.LAST_ITEM].temperature,
    //Using array order by temp from highest to lowest
    high: recordsOrderByTemp[prop.arrayProperties.FIRST_ITEM].temperature,
    low: recordsOrderByTemp[prop.arrayProperties.LAST_ITEM].temperature,
    average: totalTemp / prop.arrayProperties.LENGTH_ARRAY,
  }

  return summary
}
