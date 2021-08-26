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

interface dayTemperature  { 
  [city: string]: {
    [time: string]: {
      summary: TemperatureSummary
      temperatureAccum: number
      temperatureCount: number
    }
  } 
};

const temperatureDB: dayTemperature = {};

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  readings.forEach((reading) => {
    const {time, temperature, city} = reading;
    const cityDB = temperatureDB[city];
    const fullTime = `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`;

    if (cityDB) {
      const timeDB = temperatureDB[city][fullTime];
      if (timeDB) {
        const {summary} = timeDB;
      
        summary.high = Math.max(summary.high, temperature);
        summary.last = temperature;
        summary.low = Math.min(summary.low, temperature);
        
        timeDB.temperatureAccum += temperature;
        timeDB.temperatureCount += 1;
        summary.average = timeDB.temperatureAccum / timeDB.temperatureCount;
      } else {
        temperatureDB[city][fullTime] = {
            summary: {
              first: temperature,
              last: temperature,
              high: temperature,
              low: temperature,
              average: temperature
            },
            temperatureAccum: temperature,
            temperatureCount: 1,
        };
      }
    } else {
      temperatureDB[city] = {
        [fullTime]: {
          summary: {
            first: temperature,
            last: temperature,
            high: temperature,
            low: temperature,
            average: temperature
          },
          temperatureAccum: temperature,
          temperatureCount: 1,
        }
      };
    }
  });  
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const fullTime = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  return temperatureDB[city] ? temperatureDB[city][fullTime] ? temperatureDB[city][fullTime].summary : null : null;
}
