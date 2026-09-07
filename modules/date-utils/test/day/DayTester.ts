/**
 * @file The DayTester class.
 * @module test/day/DayTester.js
 * @author Patricia Johansson
 * @version 1.0.0
 */

import { expect } from '@jest/globals'
import Day from '../../src/Day.js'
import TimeInterval from '../../src/TimeInterval.js'

/**
 * Represents a test runner for the Day class.
 */
export default class DayTester {
  day: Day
  date: Date

  /**
   * Initialises a new instance.
   *
   * @param {Date} date - A date object that represents the day.
   */
  constructor (date: Date) {
    this.day = new Day(date)
    this.date = new Date(date)
  }

  /**
   * Run tests for the getDays method.
   *
   * @param {number} expected - The expected number of days passed, or left until the date.
   */
  runGetDaysTest (expected: number) {
    expect(this.day.getDays()).toEqual(expected)
  }

  /**
   * Run tests for the getDayOfYear method.
   *
   * @param {number} expected - The number representing the day of the year.
   */
  runGetDayOfYearTest (expected: number) {
    expect(this.day.getDayOfYear()).toEqual(expected)
  }

  /**
   * Run tests for the getDaysBetween method.
   *
   * @param {Date} date2 - The second date.
   * @param {number} expected - The expected number of days between the days.
   */
  runGetDaysBetweenTest (date2: Date, expected: number) {
    expect(this.day.getDaysBetween(date2)).toEqual(expected)
  }

  /**
   * Run tests for the getFutureDate method.
   *
   * @param {number} numberOfDays - The number of days to add.
   * @param {Date} expected - The expected returned date.
   */
  runFutureDateTest (numberOfDays: number, expected: Date) {
    const dayOriginal = new Day(this.date)
    const result = this.day.getFutureDate(numberOfDays)

    // Returned Date object is different.
    expect(result === this.date).toBeFalsy()
    expect(result).not.toBe(this.date)

    // Day object was unchanged.
    expect(this.day).toEqual(dayOriginal)

    expect(result).toEqual(expected)
  }

  /**
   * Run tests for the getPastDate method.
   *
   * @param {number} numberOfDays - The number of days to remove.
   * @param {Date} expected - The expected returned date.
   */
  runPastDateTest (numberOfDays: number, expected: Date) {
    const dayOriginal = new Day(this.date)
    const result = this.day.getPastDate(numberOfDays)

    // Returned Date object is different.
    expect(result === this.date).toBeFalsy()
    expect(result).not.toBe(this.date)

    // Day object was unchanged.
    expect(this.day).toEqual(dayOriginal)

    expect(result).toEqual(expected)
  }

  /**
   * Run tests for the isBetween method, where the result is expected to be true.
   *
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   */
  runIsBetweenTestTrue (startDate: Date, endDate: Date) {
    expect(this.day.isBetween(new TimeInterval(startDate, endDate))).toBeTruthy()
  }

  /**
   * Run tests for the isBetween method, where the result is expected to be false.
   *
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   */
  runIsBetweenTestFalse (startDate: Date, endDate: Date) {
    expect(this.day.isBetween(new TimeInterval(startDate, endDate))).toBeFalsy()
  }
}
