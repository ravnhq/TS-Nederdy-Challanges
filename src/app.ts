type Nullable<T> = T | null

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

interface TemperatureSummaryExt extends TemperatureSummary {
  totalRegistered: number
}

function updateAverage(average: number, total: number, value: number): number {
  return (average * total + value) / (total + 1)
}

function initialSummary(reading: TemperatureReading): TemperatureSummaryExt {
  return {
    totalRegistered: 1,
    first: reading.temperature,
    last: reading.temperature,
    high: reading.temperature,
    low: reading.temperature,
    average: reading.temperature,
  }
}

function updateSummary(
  current: TemperatureSummaryExt,
  reading: TemperatureReading,
): TemperatureSummaryExt {
  return {
    totalRegistered: current.totalRegistered + 1,
    first: current.first,
    last: reading.temperature,
    high: Math.max(current.high, reading.temperature),
    low: Math.min(current.low, reading.temperature),
    average: updateAverage(
      current.average,
      current.totalRegistered,
      reading.temperature,
    ),
  }
}

interface TemperatureService {
  /**
   * Process a temperature reading, may update the temperature summary
   * ahead-of-time (depending on the storage implementation)
   * @param reading
   */
  processReading(reading: TemperatureReading): void

  /**
   * Returns the temperature summary for the given pair of date and city,
   * if there's no such information returns `null`
   * @param date
   * @param city
   */
  getTemperatureSummary(date: Date, city: string): Nullable<TemperatureSummary>
}

interface LocalTemperatureStorage {
  [city: string]: {
    [summaries: string]: TemperatureSummaryExt
  }
}

class LocalTemperatureService implements TemperatureService {
  private readonly storage: LocalTemperatureStorage = {}

  processReading(reading: TemperatureReading): void {
    const dateKey = reading.time.toDateString()
    const summaries = this.storage[reading.city] || {}
    const current = summaries[dateKey] || initialSummary(reading)

    summaries[dateKey] = summaries[dateKey] === undefined
      ? current
      : updateSummary(current, reading)

    this.storage[reading.city] = summaries
  }

  getTemperatureSummary(
    date: Date,
    city: string,
  ): Nullable<TemperatureSummary> {
    const dateKey = date.toDateString()
    return this.storage[city]?.[dateKey] || null
  }
}

const temperatureService: TemperatureService = new LocalTemperatureService()

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((reading) => temperatureService.processReading(reading))
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): Nullable<TemperatureSummary> {
  return temperatureService.getTemperatureSummary(date, city)
}
