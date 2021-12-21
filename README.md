# TS-Nerdery-Challenges

## Steps

1. Fork this repo to your account
2. Before you start making changes create a new `develop` branch (`git checkout -b develop`)
3. Run `yarn install` in your terminar for install the dependencies

## Content Challenge

You are given a list of temperatures that ocurred for major US cities over the past week. Temperature readings were taken at inconsistent intervals. Process the temperature readings and create a function that will return a summary of the temperature data for a given date. The summary should include the following information:

1. First temperature reading for the day
2. Last temperature reading for the day
3. Highest temperature reading for the day
4. Lowest temperature reading for the day
5. Average of temperature readings that day

Description of the two function in the file `src/app.ts`

## Function Descriptions

The `processReadings` function will be called once with a list temperature readings and return nothing.

The `getTemperatureSummary` function will be called any number of items with a date and city, and returns the temperature summary for that day in that city. If there is no temperature data for that day and city, return null.

When you are finish the logic please run the next command `yarn test` the test will return the correct answer if the functions are correct

Recommendation: for a better performance and clean code please run the command `yarn format` and `yarn lint`


