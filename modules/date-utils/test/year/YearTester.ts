/**
 * @file The YearTester class.
 * @module test/year/YearTester.js
 * @author Patricia Johansson
 * @version 1.0.0
 */

import { expect } from '@jest/globals'
import Year from '../../src/Year.js'

/**
 * Represents a Year test runner.
 */
export default class YearTester {
  year

  /**
   * Initialises a new instance.
   *
   * @param {Date} date - Any date that is in the year.
   */
  constructor (date: Date) {
    this.year = new Year(date)
  }

  /**
   * Run tests for the isLeapYear method, where the result is expected to be true.
   */
  runIsLeapYearTestTrue () {
    expect(this.year.isLeapYear()).toBeTruthy()
  }

  /**
   * Run tests for the isLeapYear method, where the result is expected to be false.
   */
  runIsLeapYearTestFalse () {
    expect(this.year.isLeapYear()).toBeFalsy()
  }

  /**
   * Run tests for the has53weeks method, where the result is expected to be true.
   */
  runHas53weeksTestTrue () {
    expect(this.year.has53weeks()).toBeTruthy()
  }

  /**
   * Run tests for the has53weeks method, where the result is expected to be false.
   */
  runHas53weeksTestFalse () {
    expect(this.year.has53weeks()).toBeFalsy()
  }

  /**
   * Run tests for the endsOnWeek1 method, where the result is expected to be true.
   */
  runEndsOnWeek1TestTrue () {
    expect(this.year.endsOnWeek1()).toBeTruthy()
  }

  /**
   * Run tests for the endsOnWeek1 method, where the result is expected to be false.
   */
  runEndsOnWeek1TestFalse () {
    expect(this.year.endsOnWeek1()).toBeFalsy()
  }

  /**
   * Run tests for the getWeeksPerYear method.
   *
   * @param {number} expected - The expected number of weeks.
   */
  runGetWeeksPerYearTest (expected: number) {
    expect(this.year.getWeeksPerYear()).toEqual(expected)
  }
}
