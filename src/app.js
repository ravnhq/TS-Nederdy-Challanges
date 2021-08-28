"use strict";
exports.__esModule = true;
exports.getTemperatureSummary = exports.processReadings = void 0;
var example = [
    {
        time: new Date('1/3/2021'),
        temperature: 8,
        city: 'Utah'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 10,
        city: 'Utah'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 9,
        city: 'Utah'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 12,
        city: 'Utah'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 11,
        city: 'Utah'
    },
    {
        time: new Date('3/12/2021'),
        temperature: 15,
        city: 'New York'
    },
    {
        time: new Date('3/12/2021'),
        temperature: 10,
        city: 'New York'
    },
    {
        time: new Date('3/12/2021'),
        temperature: 11,
        city: 'New York'
    },
    {
        time: new Date('3/12/2021'),
        temperature: 9,
        city: 'New York'
    },
    {
        time: new Date('3/13/2021'),
        temperature: 16,
        city: 'New York'
    },
];
var readValues = [];
function processReadings(readings) {
    readValues.push.apply(readValues, readings);
}
processReadings(example);
exports.processReadings = processReadings;

function getTemperatureSummary(date, city) {
    var summary = {
        first: 0,
        last: 0,
        high: 0,
        low: 0,
        average: 0
    };
    var filteredValues = readValues.filter(function (value) {
      // console.log(value.time.getTime(), date.getTime(), date) 
        return value.time.toDateString() === date.toDateString() && value.city === city;
    });
let temperatureArray = [];
    console.log(filteredValues)
    var filteredValuesLength = filteredValues.length;
    if (filteredValuesLength > 0) {
        summary.first = filteredValues[0].temperature;
        summary.last = filteredValues[filteredValuesLength - 1].temperature;
    }
    for (var i = 0; i < filteredValues.length; i++) {
      temperatureArray.push(filteredValues[i].temperature);
    }
    summary.high = Math.max(...temperatureArray);
    summary.low = Math.min(...temperatureArray);
    summary.average = temperatureArray.reduce((a, b) => a + b, 0) / filteredValuesLength
    console.log(summary.low);
    return null; 
  }

console.log(getTemperatureSummary(new Date('1/2/2021'), 'Utah'));
exports.getTemperatureSummary = getTemperatureSummary;
