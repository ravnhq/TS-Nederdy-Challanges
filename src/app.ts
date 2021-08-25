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

interface daySumary {
  time: string
  temperature: number
  city: string
  arrivalNumber: number
}

const listDaySumary: daySumary[][] = [];
let sumaryOfDay: daySumary[] = [];
let tempReading: TemperatureReading;
let order: number;

export function processReadings(readings: TemperatureReading[]): void {
  tempReading = readings[0];
  order = 1;
  readings.forEach((dailyTemperature) => {
    if (
      dailyTemperature.time.toLocaleDateString() ===
        tempReading.time.toLocaleDateString() &&
      dailyTemperature.city === tempReading.city
    ) {
      sumaryOfDay.push({
        time: dailyTemperature.time.toLocaleDateString(),
        temperature: dailyTemperature.temperature,
        city: dailyTemperature.city,
        arrivalNumber: order,
      })
    } else {
      listDaySumary.push(sumaryOfDay);
      order = 1;
      tempReading = dailyTemperature;
      sumaryOfDay = [];
      sumaryOfDay.push({
        time: dailyTemperature.time.toLocaleDateString(),
        temperature: dailyTemperature.temperature,
        city: dailyTemperature.city,
        arrivalNumber: order,
      });
    }
    order++;
  })
  listDaySumary.push(sumaryOfDay);
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const tempDate: string = date.toLocaleDateString();
  const tempCity: string = city;
  let sumTemp = 0;
  const tempSumary: TemperatureSummary = {
    first: 0,
    last: 0,
    high: -Infinity,
    low: Infinity,
    average: 0,
  }

  for (let i = 0; i < listDaySumary.length; i++) {
    if (
      listDaySumary[i][0].time == tempDate &&
      listDaySumary[i][0].city == tempCity
    ) {
      for (let j = 0; j < listDaySumary[i].length; j++) {
        if (listDaySumary[i][j].temperature > tempSumary.high) {
          tempSumary.high = listDaySumary[i][j].temperature;
        }
        if (listDaySumary[i][j].temperature < tempSumary.low) {
          tempSumary.low = listDaySumary[i][j].temperature;
        }
        sumTemp = sumTemp + listDaySumary[i][j].temperature;
      }
      tempSumary.first = listDaySumary[i][0].temperature;
      tempSumary.last =
        listDaySumary[i][listDaySumary[i].length - 1].temperature;
      tempSumary.average = sumTemp / listDaySumary[i].length;
      return tempSumary;
    }
  }
  return null;
}
