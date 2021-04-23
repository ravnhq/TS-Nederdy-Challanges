interface TemperatureReading {
    time: Date;
    temperature: number;
    city: string;
  }
  ​
  interface TemperatureSummary {
    first: number;
    last: number;
    high: number;
    low: number;
    average: number;
  }
  ​
  type DaysType = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'; 
  type CitySummaryType = Record<string, Partial<Record<DaysType, TemperatureSummary>>>
  type CitySummaryCollectionType = Record<string, Partial<Record<DaysType, number[]>>>
  ​
  const numberToDays: Record<number, DaysType> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
  }
  ​
  const database: CitySummaryType = {}
  ​
  const example: TemperatureReading[] = [
    {
      time: new Date('1/1/2021'),
      temperature: 10,
      city: 'Utah'
    },
    {
      time: new Date('1/1/2021'),
      temperature: 9,
      city: 'Utah'
    },
    {
      time: new Date('1/1/2021'),
      temperature: 11,
      city: 'Utah'
    },
    {
      time: new Date('1/1/2021'),
      temperature: 3,
      city: 'New York'
    },
    {
      time: new Date('1/1/2021'),
      temperature: 2,
      city: 'New York'
    },
    {
      time: new Date('1/1/2021'),
      temperature: 7,
      city: 'New York'
    }
  ]

  const dateTest = new Date('1/1/2021')
  ​
  function processReadings(readings: TemperatureReading[]): void {
    const temperatures: CitySummaryCollectionType = readings.reduce((prev: CitySummaryCollectionType, nxt) => {
      const city = nxt.city;
      const day = numberToDays[nxt.time.getDay()]
  ​
      return {
        ...prev,
        [city]: {
          ...prev[city],
          [day]: [ ...(prev[city] ? prev[city][day] ?? [] : []), nxt.temperature ]
        }
      }
    }, {})
  ​
    for (const city in temperatures) {
      const days: DaysType[] = Object.keys(temperatures[city]) as DaysType[];
  ​
      database[city] = days.reduce((prev, day) => {
        const collection = temperatures[city][day] ?? [];
  ​
        return {
          ...prev,
          [day]: {
            first: collection[0],
            last: collection[collection.length - 1],
            high: Math.max(...collection),
            low: Math.min(...collection),
            average: collection.reduce((a: number, b: number) => a + b) / collection.length
          }
        }
      }, {})
    }
  }
  ​
  function getTemperatureSummary(date: Date, city: string): TemperatureSummary | null {
    if (!(city in database)) return null;
    
    const day = numberToDays[date.getDay()];
  ​
    return database[city][day] ?? null;
  }

  exports.processReadings = processReadings
  exports.getTemperatureSummary = getTemperatureSummary
  exports.example = example
  exports.dateTest = dateTest