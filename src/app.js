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
// function getNewArrayOfReadings(readings: TemperatureReading[]) {
//   const getDates = readings.map(({ time }) => time.toDateString())
//   const filterRepeatDates = [...new Set<string>(getDates)]
//   const divideArrayByDate = filterRepeatDates.map((dateTime) => {
//     return readings.filter((temperatureReading) => {
//       if (temperatureReading.time.toDateString() === dateTime) {
//         return temperatureReading
//       }
//     })
//   })
//   const newArray = divideArrayByDate.map((temperatureReading) => {
//     if (temperatureReading.length <= 1) {
//       return temperatureReading.find((a) => a)
//     } else {
//       return temperatureReading
//     }
//   })
//   const arrOfTemp = newArray.map((element) => {
//     if (Array.isArray(element)) {
//       const getDate = element.map(({ time }) => time)
//       const getTemperature = element.map(({ temperature }) => temperature)
//       const getCity = element.map(({ city }) => city)
//       const newGetDate = [...new Set<Date>(getDate)]
//       const newGetCity = [...new Set<string>(getCity)]
//       return {
//         time: newGetDate.find((a) => a),
//         temperature: getTemperature,
//         city: newGetCity.find((a) => a),
//       }
//     } else {
//       return {
//         time: element?.time,
//         temperature: element?.temperature,
//         city: element?.city,
//       }
//     }
//   })
//   return arrOfTemp
// }
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
    // return filterTimeAndCity.map((element) => {
    //   if (element.length <= 1) {
    //     return element.find((a) => a)
    //   } else {
    //     return element
    //   }
    // });
    return filterTimeAndCity;
}
function processReadings(readings) {
    return getNewArrayOfReadings(readings);
}
exports.processReadings = processReadings;
// estructuras de datos
function getTemperatureSummary(date, city, reading) {
    //add here your code
    var getData = processReadings(reading);
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
        city: 'Lima'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 8,
        city: 'Lima'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 9,
        city: 'Lima'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 10,
        city: 'Lima'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 10,
        city: 'Mexico City'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 8,
        city: 'Mexico City'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 9,
        city: 'Mexico City'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 10,
        city: 'Mexico City'
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
    {
        time: new Date('3/13/2021'),
        temperature: 16,
        city: 'London'
    },
];
// processReadings(example)
// console.log(processReadings(example), 'conPro')
console.log(getTemperatureSummary(new Date('3/13/2021'), 'London', example), 'oooo');
getTemperatureSummary(new Date('3/13/2021'), 'London', example);
// console.log(getNewArrayOfReadingsM(example))
// getNewArrayOfReadingsM(example)
