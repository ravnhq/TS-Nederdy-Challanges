function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
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

function storeByCityAndDate(example) {
  readingsByCityAndDate = groupBy(example, 'city')
  for (const city in readingsByCityAndDate) {
    const element = readingsByCityAndDate[city]
    readingsByCityAndDate[city] = groupBy(element, 'time')
  }
  return readingsByCityAndDate
}

function processDailyReading() {
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

let readingsByCityAndDate

function processReadings(example) {
  storeByCityAndDate(example)
  processDailyReading()
}

processReadings(example)

function getTemperatureSummary(city, date) {
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

console.log(getTemperatureSummary('Utah', new Date('1/2/2021')))
