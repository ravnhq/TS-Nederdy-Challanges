// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function filterByDate(dates) {
    return dates.filter(function (date, index) { return dates.map(function (d) { return d.toString(); }).indexOf(date.toString()) === index; });
}
var cityTemperatureDetail = [];
function processReadings(readings) {
    var cityNames = new Set(readings.map(function (reading) { return reading.city; }));
    cityNames.forEach(function (c) {
        var cityFilter = readings.filter(function (reading) { return reading.city === c; });
        var dates = filterByDate(cityFilter.map(function (cityDetail) { return cityDetail.time; }));
        var arrayTemp = [];
        dates.forEach(function (d) {
            var dateTemperature = {
                time: d,
                temperature: cityFilter.filter(function (c) { return c.time.toString() === d.toString(); }).map(function (c) { return c.temperature; })
            };
            arrayTemp.push(dateTemperature);
        });
        cityTemperatureDetail = __spreadArray(__spreadArray([], cityTemperatureDetail), [{ city: c, temperatureByDate: arrayTemp }]);
    });
}
function getTemperatureSummary(date, city) {
    var cityResult = cityTemperatureDetail.find(function (cTemp) { return cTemp.city === city; });
    if (!cityResult) {
        return;
    }
    var tempByCity = cityResult.temperatureByDate.find(function (x) { return x.time.toString() === date.toString(); });
    if (!tempByCity)
        return;
    var temperatures = tempByCity.temperature;
    var temperatureSummary = {
        first: temperatures[0],
        last: temperatures[temperatures.length - 1],
        high: temperatures.reduce(function (acc, next) { return acc > next ? acc : next; }),
        low: temperatures.reduce(function (acc, next) { return acc < next ? acc : next; }),
        average: temperatures.reduce(function (acc, next) { return acc + next; }) / temperatures.length
    };
    var summary = "First temperature reading for the day " + temperatureSummary.first + "\n    Last temperature reading for the day " + temperatureSummary.last + "\n    Highest temperature reading for the day " + temperatureSummary.high + "\n    Lowest temperature reading for the day " + temperatureSummary.low + "\n    Average of temperature readings that day " + temperatureSummary.average;
    console.log(summary);
}
var temp = [
    {
        time: new Date("1/1/2021"),
        temperature: 10,
        city: "Utah"
    },
    {
        time: new Date("1/1/2021"),
        temperature: 9,
        city: "Utah"
    },
    {
        time: new Date("1/1/2021"),
        temperature: 11,
        city: "Utah"
    },
    {
        time: new Date("1/1/2021"),
        temperature: 3,
        city: "New York"
    },
    {
        time: new Date("1/1/2021"),
        temperature: 2,
        city: "New York"
    },
    {
        time: new Date("1/1/2021"),
        temperature: 7,
        city: "New York"
    },
    {
        time: new Date("1/2/2021"),
        temperature: 27,
        city: "Utah"
    },
];
processReadings(temp);
getTemperatureSummary(new Date("1/1/2021"), 'Mexico');
getTemperatureSummary(new Date("1/1/2021"), 'Utah');
//exports.processReadings = processReadings
//exports.getTemperatureSummary = getTemperatureSummary
