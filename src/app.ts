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

const records: Array<TemperatureReading> = []

export function processReadings(readings: TemperatureReading[]): void {
  records.push(...readings)
  records.sort((a, b) => a.time.getTime() - b.time.getTime())
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const EMPTY_ARRAY = 0

  //Filter elements by date and city
  const recordsOrderByCityAndDate: TemperatureReading[] = records.filter(
    (item) => item.time.getDate() === date.getDate() && item.city === city,
  )

  //Order records from high to lower temperature
  const recordsOrderByTemp = [...recordsOrderByCityAndDate].sort(
    (a, b) => b.temperature - a.temperature,
  )

  // If no exist any data return null
  if (recordsOrderByCityAndDate.length === EMPTY_ARRAY) return null

  enum ArrayProperties {
    LENGTH_ARRAY = recordsOrderByCityAndDate.length,
    FIRST_ITEM = 0,
    LAST_ITEM = LENGTH_ARRAY - 1,
  }

  //Calculate sum of all the temperature to will get the average
  const totalTemp = recordsOrderByCityAndDate.reduce(
    (total, current) => total + current.temperature,
    0,
  )

  //Building the response
  const summary: TemperatureSummary = {
    first: recordsOrderByCityAndDate[ArrayProperties.FIRST_ITEM].temperature,
    last: recordsOrderByCityAndDate[ArrayProperties.LAST_ITEM].temperature,
    //Using array order by temp from highest to lowest
    high: recordsOrderByTemp[ArrayProperties.FIRST_ITEM].temperature,
    low: recordsOrderByTemp[ArrayProperties.LAST_ITEM].temperature,
    average: totalTemp / ArrayProperties.LENGTH_ARRAY,
  }

  return summary
}
