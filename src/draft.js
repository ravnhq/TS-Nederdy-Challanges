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

let readingsByCityAndDate;
const temperatureSummary = {};

function storeByCityAndDate(example) {
    readingsByCityAndDate = groupBy(example, 'city')
    for (const city in readingsByCityAndDate) {
      const element = readingsByCityAndDate[city]
      readingsByCityAndDate[city] = groupBy(element, 'time')
    }
}

function processDailyReading (readingsByCityAndDate) {
    for (const city in readingsByCityAndDate) {
            const cityReadings = readingsByCityAndDate[city];
            for (const date in cityReadings) {
                    let dailyReading = cityReadings[date];
                    if (dailyReading.length < 2) {
                        const { first } = temperatureSummary.first = dailyReading[0].temperature;
                        const { last } = temperatureSummary.last = dailyReading[0].temperature;
                        const { high } = temperatureSummary.high = dailyReading[0].temperature;
                        const { low } = temperatureSummary.low = dailyReading[0].temperature;
                        const { average } = temperatureSummary.average = dailyReading[0].temperature;
                        readingsByCityAndDate[city][date] = temperatureSummary; // agregar una tercera propiedad que sea temperature summary
                        console.log(readingsByCityAndDate);
                    } else {
                        // for (let index = 0; index < array.length; index++) {
                            //         const element = array[index];
                            //     }
                        }    
                    }
                }
}

function processReadings(example) {
    storeByCityAndDate(example)
    processDailyReading(readingsByCityAndDate)
}
  
processReadings(example)

function getTemperatureSummary(date, city){
    if (readingsByCityAndDate.hasOwnProperty(city) && readingsByCityAndDate.hasOwnProperty(date)) {
        return readingsByCityAndDate[city][date];
    } else {
        return null;
    }
}

console.log(readingsByCityAndDate['Utah'][new Date('1/3/2021')]);