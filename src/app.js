"use strict";
exports.__esModule = true;
exports.getTemperatureSummary = void 0;
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
function storeByCityAndDate(readings) {
    readingsByCityAndDate = groupBy(readings, 'city');
    for (var city in readingsByCityAndDate) {
        var element = readingsByCityAndDate[city];
        readingsByCityAndDate[city] = groupBy(element, 'time');
    }
    return readingsByCityAndDate;
}
function processDailyReading(readingsByCityAndDate) {
    var currentCity = '';
    var currentDate = '';
    Object.entries(readingsByCityAndDate).forEach(function (_a) {
        var city = _a[0], dates = _a[1];
        currentCity = city;
        var readings = Object.values(dates);
        readings.forEach(function (reading) {
            currentDate = reading[0].time;
            var temperatureSummary = {
                first: 0,
                last: 0,
                high: 0,
                low: 0,
                average: 0
            };
            Object.keys(temperatureSummary).forEach(function (value) { return (temperatureSummary[value] = reading[0].temperature); });
            if (reading.length > 2) {
                temperatureSummary.last = reading[reading.length - 1].temperature;
                var total = 0;
                for (var index = 0; index < reading.length; index++) {
                    var element = reading[index];
                    total += element.temperature;
                    if (element.temperature > temperatureSummary.high) {
                        temperatureSummary.high = element.temperature;
                    }
                    if (element.temperature < temperatureSummary.low) {
                        temperatureSummary.low = element.temperature;
                    }
                    temperatureSummary.average = total / reading.length;
                }
            }
            readingsByCityAndDate[currentCity][currentDate] = temperatureSummary;
        });
    });
}
function processReadings(readings) {
    storeByCityAndDate(readings);
    processDailyReading(readingsByCityAndDate);
}
processReadings(readings);
function getTemperatureSummary(date, city) {
    var formattedDate = date.toString();
    if (readingsByCityAndDate.hasOwnProperty(city) &&
        readingsByCityAndDate[city].hasOwnProperty(formattedDate)) {
        return readingsByCityAndDate[city][formattedDate];
    }
    else {
        return null;
    }
}
exports.getTemperatureSummary = getTemperatureSummary;
