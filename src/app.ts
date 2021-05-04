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

interface DateTemperature {
  time: Date
  temperature: number[]
}

interface CityTemperatures {
  city: string;
  temperatureByDate: DateTemperature[];
}

function filterByDate(dates: Date[]) {
  return dates.filter((date, index) => dates.map(d => d.toString()).indexOf(date.toString()) === index);
}

let cityTemperatureDetail: CityTemperatures[] = [];

function processReadings(readings: TemperatureReading[]): void {
  const cityNames = new Set(readings.map(reading => reading.city));

  cityNames.forEach(c => {
    const cityFilter = readings.filter(reading => reading.city === c);
    const dates = filterByDate(cityFilter.map(cityDetail => cityDetail.time));

    let arrayTemp: DateTemperature[] = [];
    dates.forEach(d => {
      const dateTemperature: DateTemperature = {
        time: d,
        temperature: cityFilter.filter(c => c.time.toString() === d.toString()).map(c => c.temperature)
      };
      arrayTemp.push(dateTemperature);
    });

    cityTemperatureDetail = [...cityTemperatureDetail, { city: c, temperatureByDate: arrayTemp }];
  });
}

function getTemperatureSummary(
  date: Date,
  city: string,
): void {
  const cityResult = cityTemperatureDetail.find(cTemp => cTemp.city === city);
  if (!cityResult) {
    return;
  }
  const tempByCity = cityResult.temperatureByDate.find(x => x.time.toString() === date.toString());
  if (!tempByCity)
    return;

  const temperatures = tempByCity.temperature;
  const temperatureSummary: TemperatureSummary = {
    first: temperatures[0],
    last: temperatures[temperatures.length - 1],
    high: temperatures.reduce((acc, next) => acc > next ? acc : next),
    low: temperatures.reduce((acc, next) => acc < next ? acc : next),
    average: temperatures.reduce((acc, next) => acc + next) / temperatures.length,
  };

  const summary = `First temperature reading for the day ${temperatureSummary.first}
    Last temperature reading for the day ${temperatureSummary.last}
    Highest temperature reading for the day ${temperatureSummary.high}
    Lowest temperature reading for the day ${temperatureSummary.low}
    Average of temperature readings that day ${temperatureSummary.average}`;

  console.log(summary);
}

const temp: TemperatureReading[] = [
  {
    time: new Date("1/1/2021"),
    temperature: 10,
    city: "Utah",
  },
  {
    time: new Date("1/1/2021"),
    temperature: 9,
    city: "Utah",
  },
  {
    time: new Date("1/1/2021"),
    temperature: 11,
    city: "Utah",
  },
  {
    time: new Date("1/1/2021"),
    temperature: 3,
    city: "New York",
  },
  {
    time: new Date("1/1/2021"),
    temperature: 2,
    city: "New York",
  },
  {
    time: new Date("1/1/2021"),
    temperature: 7,
    city: "New York",
  },
  {
    time: new Date("1/2/2021"),
    temperature: 27,
    city: "Utah",
  },
];


processReadings(temp);
getTemperatureSummary(new Date("1/1/2021"), 'Mexico');
getTemperatureSummary(new Date("1/1/2021"), 'Utah');

//exports.processReadings = processReadings
//exports.getTemperatureSummary = getTemperatureSummary
