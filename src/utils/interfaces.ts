const date: Date = new Date()
export interface TemperatureReading {
  time: typeof date
  temperature: number
  city: string
}

export interface TemperatureSummary {
  first: number
  last: number
  high: number
  low: number
  average: number
}
