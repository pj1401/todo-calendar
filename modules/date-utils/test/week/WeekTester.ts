/**
 * @file The WeekTester class.
 * @module test/week/WeekTester.js
 * @author Patricia Johansson
 * @version 1.0.0
 */

import { expect } from '@jest/globals'
import Week from '../../src/Week.js'

/**
 * Represents a Week test runner.
 */
export default class WeekTester {
  week: Week

  /**
   * Initialises a new instance.
   *
   * @param {Date} date - Any date that is in the week.
   */
  constructor (date: Date) {
    this.week = new Week(date)
  }

  /**
   * Run tests for the getStartOfWeek method.
   *
   * @param {Date} expected - The expected returned date (Monday).
   */
  runStartOfWeekTest (expected: Date) {
    const weekStart = new Date(expected)
    weekStart.setHours(0, 0, 0, 0)
    expect(this.week.getStartOfWeek()).toEqual(weekStart)
  }

  /**
   * Run tests for the getEndOfWeek method.
   *
   * @param {Date} expected - The expected returned date (Sunday).
   */
  runEndOfWeekTest (expected: Date) {
    const weekEnd = new Date(expected)
    weekEnd.setHours(0, 0, 0, 0)
    expect(this.week.getEndOfWeek()).toEqual(weekEnd)
  }

  /**
   * Run tests for the getWeekNumber method.
   *
   * @param {number} expected - The expected returned week number.
   */
  runWeekNumberTest (expected: number) {
    expect(this.week.getWeekNumber()).toEqual(expected)
  }
}
