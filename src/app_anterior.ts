// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
// store the datas
const allData: Array<dataByTime> = []

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

class dataByTime implements TemperatureReading {
  public dataTemperature: Array<number> = []
  // I created a new Class by error not definition
  public TSummary: ClassTSummary = new ClassTSummary(0)
  constructor(
    public time: Date,
    public city: string,
    public temperature: number,
  ) {
    this.dataTemperature.push(temperature)
  }

  addTmpe(num: number): void {
    this.dataTemperature.push(num)
  }
}

class ClassTSummary implements TemperatureSummary {
  constructor(temperature: number) {
    this.first = this.last = this.high = this.low = this.average = temperature
  }
  first
  last
  high
  low
  average
}

function existValue(data: Date) {
  for (const d of allData) {
    if (d.time.getTime() === data.getTime()) return true
  }

  return false
}

//resolving y updating sumary
function getSummary(tmpSummary: ClassTSummary, value: number): ClassTSummary {
  if (tmpSummary.first === -1) tmpSummary.first = value
  if (tmpSummary.high < value) tmpSummary.high = value

  if (tmpSummary.low > value) tmpSummary.low = value

  tmpSummary.last = value
  tmpSummary.average += value
  return tmpSummary
}

export function processReadings(readings: TemperatureReading[]): void {
  for (let i = 0; i < readings.length; i++) {
    if (!existValue(readings[i].time)) {
      // if reading[i] do not exist in allData

      const tmpe = readings[i]
      const dataT = new dataByTime(tmpe.time, tmpe.city, tmpe.temperature)

      let tmpSummary = new ClassTSummary(tmpe.temperature)
      //Searching other data with same time and city
      for (let j = i + 1; j < readings.length; j += 1) {
        //Updating the dataT
        if (
          readings[j].time.getTime() === dataT.time.getTime() &&
          readings[j].city === dataT.city
        ) {
          //Adding temperature in the array temperature of dataT
          dataT.addTmpe(readings[j].temperature)
          //Updating
          tmpSummary = getSummary(tmpSummary, readings[j].temperature)
        }
      }
      //get average
      tmpSummary.average = tmpSummary.average / dataT.dataTemperature.length

      dataT.TSummary = tmpSummary
      allData.push(dataT)
    }
  }
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code

  for (const temperatureCity of allData) {
    if (
      temperatureCity.time.getTime() === date.getTime() &&
      temperatureCity.city === city
    ) {
      return temperatureCity.TSummary
    }
  }

  return null
}
/* processReadings(example)
console.log(getTemperatureSummary(new Date('1/2/2021'), 'Utah'))
console.log(getTemperatureSummary(new Date('3/12/2021'), 'New York')) */
