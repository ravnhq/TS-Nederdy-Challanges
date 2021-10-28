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

function getNewArrayOfReadings(readings: TemperatureReading[]) {
  const getDates = readings.map(({ time }) => time.toDateString())
  const filterRepeatDates = [...new Set<string>(getDates)]
  const divideArrayByDate = filterRepeatDates.map((dateTime) => {
    return readings.filter((temperatureReading) => {
      if (temperatureReading.time.toDateString() === dateTime) {
        return temperatureReading
      }
    })
  })

  const newArray = divideArrayByDate.map((temperatureReading) => {
    if (temperatureReading.length <= 1) {
      return temperatureReading.find((a) => a)
    } else {
      return temperatureReading
    }
  })

  const arrOfTemp = newArray.map((element) => {
    if (Array.isArray(element)) {
      const getDate = element.map(({ time }) => time)
      const getTemperature = element.map(({ temperature }) => temperature)
      const getCity = element.map(({ city }) => city)

      const newGetDate = [...new Set<Date>(getDate)]
      const newGetCity = [...new Set<string>(getCity)]
      return {
        time: newGetDate.find((a) => a),
        temperature: getTemperature,
        city: newGetCity.find((a) => a),
      }
    } else {
      return {
        time: element?.time,
        temperature: element?.temperature,
        city: element?.city,
      }
    }
  })

  return arrOfTemp
}

export function processReadings(readings: TemperatureReading[]) {
  return getNewArrayOfReadings(readings)
}

// estructuras de datos
export function getTemperatureSummary(
  date: Date,
  city: string,
  reading: TemperatureReading[],
): TemperatureSummary | null {
  //add here your code
  const getData = processReadings(reading)
  console.log(getData)
  const filterData = getData.find(
    (readTemperature) =>
      readTemperature.time?.toDateString() === date.toDateString() &&
      readTemperature.city === city,
  )

  if (
    filterData?.time?.toDateString() === date.toDateString() &&
    filterData?.city === city
  ) {
    if (Array.isArray(filterData.temperature)) {
      const first = filterData.temperature[0]
      const last = filterData.temperature[filterData.temperature.length - 1]
      const high = Math.max(...filterData.temperature)
      const low = Math.min(...filterData.temperature)
      const average =
        filterData.temperature.reduce((a, b) => a + b) /
        filterData.temperature.length

      return {
        first,
        last,
        high,
        low,
        average,
      }
    } else {
      return {
        first: filterData.temperature,
        last: filterData.temperature,
        high: filterData.temperature,
        low: filterData.temperature,
        average: filterData.temperature,
      }
    }
  } else {
    return null
  }
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
    city: 'Lima',
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

// processReadings(example)
// console.log(processReadings(example), 'conPro')
console.log(
  getTemperatureSummary(new Date('1/2/2021'), 'Lima', example),
  'oooo',
)
getTemperatureSummary(new Date('1/2/2021'), 'Lima', example)
