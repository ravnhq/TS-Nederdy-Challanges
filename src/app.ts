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

function processReadings(readings: TemperatureReading[]): void {
  // add here your code
}
function getTemperatureSummary(
  date: Date,
  city: string,
): void {
  //add here your code
}

exports.processReadings = processReadings
exports.getTemperatureSummary = getTemperatureSummary
