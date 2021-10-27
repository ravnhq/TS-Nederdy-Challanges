"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.getTemperatureSummary = exports.processReadings = void 0;
function processReadings(readings) {
    // add here your code
    var getDates = readings.map(function (_a) {
        var time = _a.time;
        return time.toDateString();
    });
    var filterRepeatDates = __spreadArray([], __read(new Set(getDates)));
    var divideArrayByDate = filterRepeatDates.map(function (dateTime) {
        return readings.filter(function (temperatureReading) {
            if (temperatureReading.time.toDateString() === dateTime) {
                return temperatureReading;
            }
        });
    });
    var newArray = divideArrayByDate.map(function (temperatureReading) {
        if (temperatureReading.length <= 1) {
            return temperatureReading.find(function (a) { return a; });
        }
        else {
            return temperatureReading;
        }
    });
    var arrOfTemp = newArray.map(function (element) {
        if (Array.isArray(element)) {
            var getDate = element.map(function (_a) {
                var time = _a.time;
                return time.toDateString();
            });
            var getTemperature = element.map(function (_a) {
                var temperature = _a.temperature;
                return temperature;
            });
            var getCity = element.map(function (_a) {
                var city = _a.city;
                return city;
            });
            var newGetDate = __spreadArray([], __read(new Set(getDate)));
            var newGetCity = __spreadArray([], __read(new Set(getCity)));
            return {
                time: newGetDate.find(function (a) { return a; }),
                temperature: getTemperature,
                city: newGetCity.find(function (a) { return a; })
            };
        }
        else {
            return {
                time: element === null || element === void 0 ? void 0 : element.time.toDateString(),
                temperature: element === null || element === void 0 ? void 0 : element.temperature,
                city: element === null || element === void 0 ? void 0 : element.city
            };
        }
    });
    console.log(arrOfTemp, 'arrOfTemp');
}
exports.processReadings = processReadings;
function getTemperatureSummary(date, city) {
    //add here your code
    // if()
    return null;
}
exports.getTemperatureSummary = getTemperatureSummary;
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
processReadings(example);
// console.log(processReadings(example))
