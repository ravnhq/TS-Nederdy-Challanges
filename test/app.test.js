const {
  processReadings,
  getTemperatureSummary,
} = require("../dist/app")

const dateTest = new Date("1/1/2021")

const example = [
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

describe("Process information", () => {
  test("run function with the values", () => {
    expect(processReadings(example))
  })
})

describe("Temperature of the city", () => {
  test("run function getTemperatureSummary", () => {
    expect(getTemperatureSummary(dateTest, "Utah")).toMatchSnapshot()
  })
})
