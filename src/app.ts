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
const temperatureReadings: TemperatureReading[] = []

export function processReadings(readings: TemperatureReading[]): void {
  temperatureReadings.push(...readings)
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  // verify if same city first
  const specificReadings: TemperatureSummary = temperatureReadings.reduce(
    // QUESTION: why when I add type TemperatureReading to temperatureReading on the line below, I get a: No overloads matches this call (even though temperatureReadings is an array of type TemperatureReading)
    (acc: any, temperatureReading /*:TemperatureReading*/) => {
      if (date !== temperatureReading.time) {
        // console.log(`1 ${date} and ${city} got me in here`)
        return
      }
      if (city !== temperatureReading.city) {
        // console.log(`2 ${date} and ${city} got me in here`)
        return
      }

      acc.first = temperatureReading.temperature
      acc.last = temperatureReading.temperature
      acc.high = temperatureReading.temperature
      acc.low = temperatureReading.temperature
      acc.average = temperatureReading.temperature
      return
    },
    { first: null, last: null, high: null, low: null, average: null },
  )
  console.log(specificReadings)

  return specificReadings
}
