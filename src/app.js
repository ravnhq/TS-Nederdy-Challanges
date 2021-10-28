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
function getNewArrayOfReadings(readings) {
    var getNames = readings.map(function (_a) {
        var city = _a.city;
        return city;
    });
    var filterNames = __spreadArray([], __read(new Set(getNames)));
    var getArrByNames = filterNames.map(function (element) {
        return readings.filter(function (_a) {
            var city = _a.city;
            return city === element;
        });
    });
    var filterTimeAndCity = getArrByNames.map(function (arr) {
        var getTime = arr.map(function (_a) {
            var time = _a.time;
            return time.toDateString();
        });
        var filterRepeatTime = __spreadArray([], __read(new Set(getTime)));
        var getFilterArr = filterRepeatTime.map(function (element) {
            return arr.filter(function (_a) {
                var time = _a.time;
                return element === time.toDateString();
            });
        });
        return getFilterArr.map(function (filterArr) {
            var getTime = filterArr.map(function (_a) {
                var time = _a.time;
                return time.toDateString();
            });
            var getTemperature = filterArr.map(function (_a) {
                var temperature = _a.temperature;
                return temperature;
            });
            var getCity = filterArr.map(function (_a) {
                var city = _a.city;
                return city;
            });
            var filterRepeatTime = __spreadArray([], __read(new Set(getTime)));
            var filterRepeatCity = __spreadArray([], __read(new Set(getCity)));
            return {
                time: filterRepeatTime.find(function (a) { return a; }),
                temperature: getTemperature.length <= 1
                    ? getTemperature.find(function (a) { return a; })
                    : getTemperature,
                city: filterRepeatCity.find(function (a) { return a; })
            };
        });
    });
    return filterTimeAndCity;
}
function processReadings(readings) {
    console.log(getNewArrayOfReadings(readings));
}
exports.processReadings = processReadings;
// estructuras de datos
function getTemperatureSummary(date, city) {
    //add here your code
    var getData = getNewArrayOfReadings(example);
    // console.log(getData)
    var getArrayData = getData.map(function (element) {
        return element.find(function (readTemperature) {
            return readTemperature.time === date.toDateString() &&
                readTemperature.city === city;
        });
    });
    var filterData = getArrayData.find(function (tem) { return tem !== undefined; });
    if ((filterData === null || filterData === void 0 ? void 0 : filterData.time) === date.toDateString() && (filterData === null || filterData === void 0 ? void 0 : filterData.city) === city) {
        if (Array.isArray(filterData.temperature)) {
            var first = filterData.temperature[0];
            var last = filterData.temperature[filterData.temperature.length - 1];
            var high = Math.max.apply(Math, __spreadArray([], __read(filterData.temperature)));
            var low = Math.min.apply(Math, __spreadArray([], __read(filterData.temperature)));
            var average = filterData.temperature.reduce(function (a, b) { return a + b; }) /
                filterData.temperature.length;
            return {
                first: first,
                last: last,
                high: high,
                low: low,
                average: average
            };
        }
        else {
            return {
                first: filterData.temperature,
                last: filterData.temperature,
                high: filterData.temperature,
                low: filterData.temperature,
                average: filterData.temperature
            };
        }
    }
    else {
        return null;
    }
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
// processReadings(example)
// console.log(processReadings(example), 'conPro')
console.log(getTemperatureSummary(new Date('1/2/2021'), 'Utah'), 'oooo');
getTemperatureSummary(new Date('1/2/2021'), 'Utah');
// console.log(getNewArrayOfReadingsM(example))
// getNewArrayOfReadingsM(example)
