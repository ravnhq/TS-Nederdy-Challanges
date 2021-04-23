"use strict";
const numberToDays = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
};
const database = {};
const example = [
    {
        time: new Date('1/1/2021'),
        temperature: 10,
        city: 'Utah'
    },
    {
        time: new Date('1/1/2021'),
        temperature: 9,
        city: 'Utah'
    },
    {
        time: new Date('1/1/2021'),
        temperature: 11,
        city: 'Utah'
    },
    {
        time: new Date('1/1/2021'),
        temperature: 3,
        city: 'New York'
    },
    {
        time: new Date('1/1/2021'),
        temperature: 2,
        city: 'New York'
    },
    {
        time: new Date('1/1/2021'),
        temperature: 7,
        city: 'New York'
    }
];
function processReadings(readings) {
    const temperatures = readings.reduce((prev, nxt) => {
        var _a;
        const city = nxt.city;
        const day = numberToDays[nxt.time.getDay()];
        return Object.assign(Object.assign({}, prev), { [city]: Object.assign(Object.assign({}, prev[city]), { [day]: [...(prev[city] ? (_a = prev[city][day]) !== null && _a !== void 0 ? _a : [] : []), nxt.temperature] }) });
    }, {});
    for (const city in temperatures) {
        const days = Object.keys(temperatures[city]);
        database[city] = days.reduce((prev, day) => {
            var _a;
            const collection = (_a = temperatures[city][day]) !== null && _a !== void 0 ? _a : [];
            return Object.assign(Object.assign({}, prev), { [day]: {
                    first: collection[0],
                    last: collection[collection.length - 1],
                    high: Math.max(...collection),
                    low: Math.min(...collection),
                    average: collection.reduce((a, b) => a + b) / collection.length
                } });
        }, {});
    }
}
function getTemperatureSummary(date, city) {
    var _a;
    if (!(city in database))
        return null;
    const day = numberToDays[date.getDay()];
    return (_a = database[city][day]) !== null && _a !== void 0 ? _a : null;
}
exports.processReadings = processReadings;
exports.getTemperatureSummary = getTemperatureSummary;
exports.example = example;
