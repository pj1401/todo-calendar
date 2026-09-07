/**
 * @file Tests for the Day.js file.
 * @module test/day/Day.test.js
 * @author Patricia Johansson
 * @version 1.0.0
 */

import {describe, test} from '@jest/globals'
import DayTester from './DayTester.js'

describe('Day', () => {
  describe('getDays', () => {
    test('Count days passed', () => {
      // Get the date from one week ago.
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      const dayTester = new DayTester(oneWeekAgo)
      dayTester.runGetDaysTest(-7)
    })

    test('Count days until', () => {
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 7)

      const dayTester = new DayTester(nextWeek)
      dayTester.runGetDaysTest(7)
    })
  })

  describe('getDayOfYear', () => {
    test('30 September 2025, returns 273', () => {
      const dayTester = new DayTester(new Date('2025-10-01'))
      dayTester.runGetDayOfYearTest(274)
    })
  })

  describe('getDaysBetween', () => {
    test('Over one month between dates, returns 32', () => {
      const date1 = new Date('2025-08-14')
      const date2 = new Date('2025-09-15')
      const dayTester = new DayTester(date1)
      dayTester.runGetDaysBetweenTest(date2, 32)
    })
    test('Over one year between dates, returns 367', () => {
      const date1 = new Date('2024-09-13')
      const date2 = new Date('2025-09-15')
      const dayTester = new DayTester(date1)
      dayTester.runGetDaysBetweenTest(date2, 367)
    })
  })

  describe('isBetween', () => {
    test('Date is in the interval', () => {
      const dayTester = new DayTester(new Date('2025-09-30'))
      dayTester.runIsBetweenTestTrue(new Date('2025-09-29'), new Date('2025-10-01'))
    })

    test('Date is not in the interval', () => {
      const dayTester = new DayTester(new Date('2024-12-31'))
      dayTester.runIsBetweenTestFalse(new Date('2025-01-01'), new Date('2025-12-31'))
    })
  })

  describe('getFutureDate', () => {
    test('30 January 2025, Thursday, add 5 days, returns 2025-02-04', () => {
      const dayTester = new DayTester(new Date('2025-01-30'))
      dayTester.runFutureDateTest(5, new Date('2025-02-04'))
    })
  })

  describe('getPastDate', () => {
    test('3 January 2025, Friday, remove 10 days, returns 2024-12-24', () => {
      const dayTester = new DayTester(new Date('2025-01-03'))
      dayTester.runPastDateTest(10, new Date('2024-12-24'))
    })
  })
})
