const {
  processReadings,
  getTemperatureSummary,
  example,
} = require("../dist/app")
const dateTest = new Date("1/1/2021")

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
