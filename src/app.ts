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

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  const getDates = readings.map(({time}) => time.toDateString());
  const filterRepeatDates = [...new Set<string>(getDates)];
  const divideArrayByDate = filterRepeatDates.map( dateTime => {
    return readings.filter( temperatureReading => {
      if(temperatureReading.time.toDateString() === dateTime) {
        return temperatureReading;
      }
    })
  });

  const newArray = divideArrayByDate.map( temperatureReading => {
    if(temperatureReading.length <= 1) {
      return temperatureReading.find(a => a);
    } else {
      return temperatureReading;
    }
  })
  console.log(newArray);
    
  // })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  return null
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
];

processReadings(example)
// console.log(processReadings(example))