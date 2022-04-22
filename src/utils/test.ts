import { TemperatureReading } from './interfaces'

const example = [
  {
    time: new Date('1/3/2021'),
    temperature: 8,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 10,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 9,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 12,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 11,
    city: 'Utah',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 15,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 10,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 11,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 9,
    city: 'New York',
  },
  {
    time: new Date('3/13/2021'),
    temperature: 16,
    city: 'New York',
  },
]

type MyType = { [x: string]: TemperatureReading[] }

export function groupByCity(objectArray: TemperatureReading[]) {
  return objectArray.reduce(function (accumulator: MyType, object) {
    const groupingProperty = object.city
    if (!accumulator[groupingProperty]) {
      accumulator[groupingProperty] = []
    }
    accumulator[groupingProperty].push(object)
    return accumulator
  }, {})
}

export function groupByDate(objectArray: TemperatureReading[]) {
  return objectArray.reduce(function (accumulator: MyType, object) {
    const groupingProperty = object.time
    if (!accumulator[groupingProperty]) {
      accumulator[groupingProperty] = []
    }
    accumulator[groupingProperty].push(object)
    return accumulator
  }, {})
}

console.log(groupByCity(example))
console.log(groupByDate(example))
