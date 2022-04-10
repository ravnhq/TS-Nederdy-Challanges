"use strict";
exports.__esModule = true;
exports.getTemperatureSummary = exports.processReadings = void 0;
function processReadings(readings) {
    // add here your code
}
exports.processReadings = processReadings;
// Hacer una funcion grande compuesta de varias pequeñas
// que iteren sobre readings y guarden el resultado en otro objeto
// cuya interfaz extends from TemperatureSummary
var temperatureResults;
var readingsToProcess;
function filterByCity(readings, city) {
    var filteredByCity = readings.filter(function (reading) { return reading.city === city; });
    return filteredByCity;
}
var filteredCities = filterByCity(readings, city);
function filterByDate(date) {
    var filteredByDate = filteredCities.filter(function (reading) { return reading.date === date; });
    return filteredByDate;
}
readingsToProcess = filterByDate(date);
function getAverage(readingsToProcess) {
    var total = readingsToProcess.reduce(function (prev, curr) { return prev + curr.temperature; }, 0);
    temperatureResults.average = total / readingsToProcess.length;
}
function getTemperatureSummary(date, city) {
    return temperatureResults;
    return null;
}
exports.getTemperatureSummary = getTemperatureSummary;
