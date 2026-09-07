/**
 * @file Tests for the DateUtil.js file.
 * @module test/DateUtil.test.js
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import {describe, expect, test} from '@jest/globals'
import DateUtil from '../src/DateUtil.js'

describe('DateUtil', () => {
  describe('countDays', () => {
    test('Count days passed', () => {
      // Get the date from one week ago.
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      const dateUtil = new DateUtil()
      expect(dateUtil.countDays(oneWeekAgo)).toEqual(-7)
    })

    test('Count days until', () => {
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 7)

      const dateUtil = new DateUtil()
      expect(dateUtil.countDays(nextWeek)).toEqual(7)
    })
  })

  describe('getWeekNumber', () => {
    test('Get week number', () => {
      const date = new Date('2025-09-17')
      const weekNumber = 38

      const dateUtil = new DateUtil()
      expect(dateUtil.getWeekNumber(date)).toEqual(weekNumber)
    })
  })

  describe('getOrdinalDate', () => {
    test('30 September 2025, returns 273', () => {
      const date = new Date('2025-09-30')
      const dateUtil = new DateUtil()
      expect(dateUtil.getOrdinalDate(date)).toEqual(273)
    })
  })

  describe('getDaysBetween', () => {
    test('Get number of days between two dates', () => {
      const date1 = new Date('2025-09-15')
      const date2 = new Date('2025-09-22')

      const dateUtil = new DateUtil()
      expect(dateUtil.getDaysBetween(date1, date2)).toEqual(7)
    })

    test('Get negative days if the date2 is earlier than date1', () => {
      const date1 = new Date('2025-09-15')
      const date2 = new Date('2025-09-08')

      const dateUtil = new DateUtil()
      expect(dateUtil.getDaysBetween(date1, date2)).toEqual(-7)
    })
  })

  describe('getDatesBetween', () => {
    test('Returns all dates between 2025-10-25 and 2025-11-02, inclusive', () => {
      const startDate = new Date('2025-10-25')
      const endDate = new Date('2025-11-02')
      const expectedResult = [
        new Date(2025, 9, 25),
        new Date(2025, 9, 26),
        new Date(2025, 9, 27),
        new Date(2025, 9, 28),
        new Date(2025, 9, 29),
        new Date(2025, 9, 30),
        new Date(2025, 9, 31),
        new Date(2025, 10, 1),
        new Date(2025, 10, 2)
      ]

      const dateUtil = new DateUtil()
      const result = dateUtil.getDatesBetween(startDate, endDate)
      for (const date of result) {
        expect(date.getHours()).toEqual(0)
      }
      expect(result).toHaveLength(9)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('isBetween', () => {
    test('Date is in the interval', () => {
      const date = new Date('2025-09-30')
      const startDate = new Date('2025-09-29')
      const endDate = new Date('2025-10-01')

      const dateUtil = new DateUtil()
      expect(dateUtil.isBetween(date, startDate, endDate)).toBeTruthy()
    })

    test('Date is not in the interval', () => {
      const date = new Date('2024-12-31')
      const startDate = new Date('2025-01-01')
      const endDate = new Date('2025-12-31')

      const dateUtil = new DateUtil()
      expect(dateUtil.isBetween(date, startDate, endDate)).toBeFalsy()
    })
  })

  describe('startOfWeek', () => {
    test('Get the start of the week', () => {
      const date = new Date('2025-09-30')
      const weekStart = new Date('2025-09-29')
      weekStart.setHours(0, 0, 0, 0)
      const dateUtil = new DateUtil()

      // Consider Monday the start of the week.
      expect(dateUtil.startOfWeek(date)).toEqual(weekStart)
    })
  })

  describe('endOfWeek', () => {
    test('Get the end of the week, 30 September 2025, Tuesday, returns 2025-10-05', () => {
      const date = new Date('2025-09-30')
      const weekEnd = new Date('2025-10-05')
      weekEnd.setHours(0, 0, 0, 0)
      const dateUtil = new DateUtil()

      // Consider Sunday the end of the week.
      expect(dateUtil.endOfWeek(date)).toEqual(weekEnd)
    })
  })

  describe('getDaysUntilWeekend', () => {
    test('Get the number of days until the weekend, 2025-11-05 returns 3', () => {
      const date = new Date('2025-11-05')
      const dateUtil = new DateUtil()
      expect(dateUtil.getDaysUntilWeekend(date)).toEqual(3)
    })

    test('Saturday returns 0', () => {
      const date = new Date('2025-11-08')
      const dateUtil = new DateUtil()
      expect(dateUtil.getDaysUntilWeekend(date)).toEqual(0)
    })

    test('Sunday returns 6', () => {
      const date = new Date('2025-10-26')
      const dateUtil = new DateUtil()
      expect(dateUtil.getDaysUntilWeekend(date)).toEqual(6)
    })
  })

  describe('countWorkingDays', () => {
    test('Count working days between 2025-10-20 and 2025-11-01, returns 10', () => {
      const startDate = new Date('2025-10-20')
      const endDate = new Date('2025-11-01')
      const dateUtil = new DateUtil()
      expect(dateUtil.countWorkingDays(startDate, endDate)).toEqual(10)
    })
  })

  describe('addDays', () => {
    test('Add days to a date', () => {
      const date = new Date('2025-01-30')
      const dateUtil = new DateUtil()
      const result = dateUtil.addDays(date, 5)

      expect(result.getDate()).toEqual(4)
      expect(result.getMonth()).toEqual(1) // February gives 1
    })

    test('Handle turn of the year', () => {
      const date = new Date('2025-12-31')
      const dateUtil = new DateUtil()
      const result = dateUtil.addDays(date, 2)

      expect(result.getDate()).toEqual(2)
      expect(result.getMonth()).toEqual(0)
      expect(result.getFullYear()).toEqual(2026) // Expected: 2 January 2026
    })
  })

  describe('removeDays', () => {
    test('Remove days from a date', () => {
      const date = new Date('2025-01-03')
      const dateUtil = new DateUtil()
      const result = dateUtil.removeDays(date, 10)

      expect(result.getFullYear()).toEqual(2024)
      expect(result.getMonth()).toEqual(11) // Expected: December 2024
    })
  })
})
