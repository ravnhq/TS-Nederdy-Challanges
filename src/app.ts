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

const temperatures: Array<TemperatureReading> = []

export function processReadings(readings: TemperatureReading[]): void {
  temperatures.push(...readings);
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const filteredTemperatures = temperatures.filter(value => value.time.getTime() === new Date(date).getTime() && value.city === city);
  const totalFilteredTemperatures = filteredTemperatures.length;

  if (totalFilteredTemperatures > 0) {
    const summary: TemperatureSummary = {
      first: filteredTemperatures[0].temperature,
      last: filteredTemperatures[totalFilteredTemperatures - 1].temperature,
      high: filteredTemperatures[0].temperature,
      low: filteredTemperatures[0].temperature,
      average: filteredTemperatures[0].temperature,
    };

    for (let i = 1; i < filteredTemperatures.length; i++) {
      summary.high = summary.high < filteredTemperatures[i].temperature ? filteredTemperatures[i].temperature : summary.high;
      summary.low = summary.low > filteredTemperatures[i].temperature ? filteredTemperatures[i].temperature : summary.low;
      summary.average += filteredTemperatures[i].temperature;
    }

    summary.average = Math.round((summary.average / totalFilteredTemperatures) * 100) / 100;

    return summary;
  }

  return null;
}