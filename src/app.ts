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

const example = [
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
]

export function processReadings(readings: TemperatureReading[]): void {
  console.log(readings)
  return
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const groupReadings = example.reduce(
    (tmp: TemperatureReading | any, obj: TemperatureReading) =>
      Object.assign(tmp, {
        [obj.city]: (tmp[obj.city] || []).concat(obj),
      }),
    [],
  )
  const readFiltered = groupReadings[city]
  if (groupReadings[city]) {
    const datedReadings = readFiltered.filter(
      (item: TemperatureReading) => item.time.toString() === date.toString(),
    )
    const temperaturesReading = datedReadings.map(
      (item: TemperatureReading) => item.temperature,
    )
    const temperatureSummary: TemperatureSummary = {
      first: temperaturesReading[0],
      last: temperaturesReading[temperaturesReading.length - 1],
      high: Math.max(...temperaturesReading),
      low: Math.min(...temperaturesReading),
      average:
        temperaturesReading.reduce((a: number, b: number) => a + b, 0) /
        temperaturesReading.length,
    }
    return temperatureSummary
  }
  return null
}
