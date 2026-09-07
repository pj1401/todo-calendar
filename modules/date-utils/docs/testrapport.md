# Testrapport

Testning sker med automatiska enhetstester.

## Run Tests

```bash
npm run test # runs all tests

npm run test:only # runs specific tests

# examples:
npm run test:only "getWeekNumber End of the year"

npm run test:only getDatesBetween
```

## Tests

There are 4 test suites.

 - [DateUtil](../test/DateUtil.test.js)
 - [Year](../test/year/Year.test.js)
 - [Week](../test/week/Week.test.js)
 - [Day](../test/day/Day.test.js)

## Logs

### 11-10

 - Ran all tests, 79 total
 - All tests passed

![Screenshot from running the tests](/docs/date-utils-test-11-10.png)

### 09-29

 - Ran all tests, 30 total
 - All tests passed

![Screenshot from running the tests](/docs/date-utils-test-09-29.png)
