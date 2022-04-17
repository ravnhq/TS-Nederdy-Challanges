"use strict";
exports.__esModule = true;
exports.getTemperatureSummary = exports.processReadings = void 0;
function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}
var readingsByCityAndDate;
var processedReadingsStorage;
function storeByCityAndDate(example) {
    readingsByCityAndDate = groupBy(example, 'city');
    for (var city in readingsByCityAndDate) {
        var element = readingsByCityAndDate[city];
        readingsByCityAndDate[city] = groupBy(element, 'time');
    }
}
function processDailyReading(readingsByCityAndDate) {
    for (var city in readingsByCityAndDate) {
        var cityReadings = readingsByCityAndDate[city];
        for (var date in cityReadings) {
            var dailyReading = cityReadings[date];
            // TODO: process dailyReading as per TemperatureSummary
        }
    }
}
function processReadings(readings) {
    storeByCityAndDate(example);
    processDailyReading(readingsByCityAndDate);
}
exports.processReadings = processReadings;
processReadings(readings);
function getTemperatureSummary(date, city) { }
exports.getTemperatureSummary = getTemperatureSummary;
