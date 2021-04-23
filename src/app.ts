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
type DaysType =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
type CitySummaryType = Record<
  string,
  Partial<Record<DaysType, TemperatureSummary>>
>
type CitySummaryCollectionType = Record<
  string,
  Partial<Record<DaysType, number[]>>
>
const numberToDays: Record<number, DaysType> = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
}
const database: CitySummaryType = {}
const example: TemperatureReading[] = [
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
]
function processReadings(readings: TemperatureReading[]): void {
  // add here your code
}
function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null | void {
  //add here your code
}

exports.processReadings = processReadings
exports.getTemperatureSummary = getTemperatureSummary
exports.example = example
