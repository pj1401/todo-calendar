/**
 * @file Tests for the Week.js file.
 * @module test/week/Week.test.js
 * @author Patricia Johansson
 * @version 1.0.0
 */

import {describe, test} from '@jest/globals'
import WeekTester from './WeekTester.js'

describe('Week', () => {
  describe('getStartOfWeek', () => {
    test('Get the start of the week after daylight savings starts, Sunday', () => {
      const weekTester = new WeekTester(new Date('2025-03-30'))
      weekTester.runStartOfWeekTest(new Date('2025-03-24'))
    })

    test('26 October 2025, DST ends, Sunday, returns 2025-10-20', () => {
      const weekTester = new WeekTester(new Date('2025-10-26'))
      weekTester.runStartOfWeekTest(new Date('2025-10-20'))
    })

    test('The week starts in the preceding year, Thursday', () => {
      const weekTester = new WeekTester(new Date('2026-01-01'))
      weekTester.runStartOfWeekTest(new Date('2025-12-29'))
    })

    test('1 September 2025, Monday, returns 2025-09-01', () => {
      const weekTester = new WeekTester(new Date('2025-09-01'))
      weekTester.runStartOfWeekTest(new Date('2025-09-01'))
    })

    test('1 July 2025, Tuesday, returns 2025-06-30', () => {
      const weekTester = new WeekTester(new Date('2025-07-01'))
      weekTester.runStartOfWeekTest(new Date('2025-06-30'))
    })

    test('2 April 2025, Wednesday, returns 2025-03-31', () => {
      const weekTester = new WeekTester(new Date('2025-04-02'))
      weekTester.runStartOfWeekTest(new Date('2025-03-31'))
    })

    test('3 October 2025, Friday, returns 2025-09-29', () => {
      const weekTester = new WeekTester(new Date('2025-10-03'))
      weekTester.runStartOfWeekTest(new Date('2025-09-29'))
    })

    test('2 March 2024, Saturday, returns 2024-02-26', () => {
      const weekTester = new WeekTester(new Date('2024-03-02'))
      weekTester.runStartOfWeekTest(new Date('2024-02-26'))
    })
  })

  describe('getEndOfWeek', () => {
    test('29 December 2025, Monday, the week ends in the following year', () => {
      const weekTester = new WeekTester(new Date('2025-12-29'))
      weekTester.runEndOfWeekTest(new Date('2026-01-04'))
    })

    test('27 February 2024, Tuesday, returns 2024-03-03', () => {
      const weekTester = new WeekTester(new Date('2024-02-27'))
      weekTester.runEndOfWeekTest(new Date('2024-03-03'))
    })

    test('22 October 2025, Wednesday, DST ends, returns 2025-10-26', () => {
      const weekTester = new WeekTester(new Date('2025-10-22'))
      weekTester.runEndOfWeekTest(new Date('2025-10-26'))
    })

    test('27 March 2025, Thursday, DST starts, returns 2025-03-30', () => {
      const weekTester = new WeekTester(new Date('2025-03-27'))
      weekTester.runEndOfWeekTest(new Date('2025-03-30'))
    })

    test('31 October 2025, Friday, returns 2025-11-02', () => {
      const weekTester = new WeekTester(new Date('2025-10-31'))
      weekTester.runEndOfWeekTest(new Date('2025-11-02'))
    })

    test('31 May 2025, Saturday, returns 2025-06-01', () => {
      const weekTester = new WeekTester(new Date('2025-05-31'))
      weekTester.runEndOfWeekTest(new Date('2025-06-01'))
    })

    test('31 August 2025, Sunday, returns 2025-08-31', () => {
      const weekTester = new WeekTester(new Date('2025-08-31'))
      weekTester.runEndOfWeekTest(new Date('2025-08-31'))
    })
  })

  describe('getWeekNumber', () => {
    describe('Beginning of the year', () => {
      test('1 January 2021, Friday, returns 53', () => {
        const weekTester = new WeekTester(new Date('2021-01-01'))
        weekTester.runWeekNumberTest(53)
      })

      test('4 January 2021, Monday, returns 1', () => {
        const weekTester = new WeekTester(new Date('2021-01-04'))
        weekTester.runWeekNumberTest(1)
      })

      test('1 January 2022, Saturday, returns 52', () => {
        const weekTester = new WeekTester(new Date('2022-01-01'))
        weekTester.runWeekNumberTest(52)
      })

      test('3 January 2022, Monday, returns 1', () => {
        const weekTester = new WeekTester(new Date('2022-01-03'))
        weekTester.runWeekNumberTest(1)
      })

      test('1 January 2024, Monday, returns 1', () => {
        const weekTester = new WeekTester(new Date('2024-01-01'))
        weekTester.runWeekNumberTest(1)
      })

      test('1 January 2025, Wednesday, returns 1', () => {
        const weekTester = new WeekTester(new Date('2025-01-01'))
        weekTester.runWeekNumberTest(1)
      })

      test('1 January 2027, Friday, returns 53', () => {
        const weekTester = new WeekTester(new Date('2027-01-01'))
        weekTester.runWeekNumberTest(53)
      })

      test('4 January 2027, Monday, returns 1', () => {
        const weekTester = new WeekTester(new Date('2027-01-04'))
        weekTester.runWeekNumberTest(1)
      })

      test('1 January 2033, Saturday, returns 53', () => {
        const weekTester = new WeekTester(new Date('2033-01-01'))
        weekTester.runWeekNumberTest(53)
      })
    })

    describe('End of the year', () => {
      test('27 December 2004, Monday, returns 53', () => {
        const weekTester = new WeekTester(new Date('2004-12-27'))
        weekTester.runWeekNumberTest(53)
      })

      test('31 December 2004, Friday, returns 53', () => {
        const weekTester = new WeekTester(new Date('2004-12-31'))
        weekTester.runWeekNumberTest(53)
      })

      test('31 December 2012, Monday, returns 1', () => {
        const weekTester = new WeekTester(new Date('2012-12-31'))
        weekTester.runWeekNumberTest(1)
      })

      test('28 December 2015, Monday, returns 53', () => {
        const weekTester = new WeekTester(new Date('2015-12-28'))
        weekTester.runWeekNumberTest(53)
      })

      test('31 December 2015, Thursday, returns 53', () => {
        const weekTester = new WeekTester(new Date('2015-12-31'))
        weekTester.runWeekNumberTest(53)
      })

      test('28 December 2020, Monday, returns 53', () => {
        const weekTester = new WeekTester(new Date('2020-12-28'))
        weekTester.runWeekNumberTest(53)
      })

      test('31 December 2020, Thursday, returns 53', () => {
        const weekTester = new WeekTester(new Date('2020-12-31'))
        weekTester.runWeekNumberTest(53)
      })

      test('25 December 2023, Monday, returns 52', () => {
        const weekTester = new WeekTester(new Date('2023-12-25'))
        weekTester.runWeekNumberTest(52)
      })

      test('31 December 2023, Sunday, returns 52', () => {
        const weekTester = new WeekTester(new Date('2023-12-31'))
        weekTester.runWeekNumberTest(52)
      })

      test('29 December 2025, Monday, returns 1', () => {
        const weekTester = new WeekTester(new Date('2025-12-29'))
        weekTester.runWeekNumberTest(1)
      })

      test('31 December 2025, Wednesday, returns 1', () => {
        const weekTester = new WeekTester(new Date('2025-12-31'))
        weekTester.runWeekNumberTest(1)
      })
    })
  })
})
