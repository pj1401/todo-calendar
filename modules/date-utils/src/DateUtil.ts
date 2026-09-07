/**
 * @file The DateUtil class.
 * @author Patricia Johansson <pj222uc@student.lnu.se>
 * @version 1.0.0
 */

import Day from './Day.js'
import Month from './Month.js'
import TimeInterval from './TimeInterval.js'
import Week from './Week.js'

/**
 * Collection of date utils.
 */
export default class DateUtil {
  /**
   * Count days passed or days until the specified date.
   *
   * @param {Date} date - The specified date.
   * @returns {number} The number of days.
   */
  countDays (date: Date): number {
    const day = new Day(date)
    return day.getDays()
  }

  /**
   * Get the week number from the specified date.
   *
   * @param {Date} date - The specified date.
   * @returns {number} The week number.
   */
  getWeekNumber (date: Date): number {
    const week = new Week(date)
    return week.getWeekNumber()
  }

  /**
   * Get the day of the year from a date.
   *
   * @param {Date} date - The specified date.
   * @returns {number} A number that represents the day of the year.
   */
  getOrdinalDate (date: Date): number {
    const day = new Day(date)
    return day.getDayOfYear()
  }

  /**
   * Get the difference between two dates.
   *
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @returns {number} The number of days between the dates.
   */
  getDaysBetween (date1: Date, date2: Date): number {
    const day = new Day(date1)
    return day.getDaysBetween(date2)
  }

  /**
   * Get an array of dates between two dates, inclusive.
   *
   * @param {Date} startDate - The starting date.
   * @param {Date} endDate - The end date.
   * @returns {Date[]} An array of Date objects.
   */
  getDatesBetween (startDate: Date, endDate: Date): Date[] {
    const timeInterval = new TimeInterval(startDate, endDate)
    return timeInterval.getDatesBetween()
  }

  /**
   * Get the quarter of the year the date is in.
   *
   * @param {Date} date - The specified date.
   * @returns {number} A number representing the quarter of the year.
   */
  getQuarter (date: Date): number {
    const month = new Month(date)
    return month.getYearQuarter()
  }

  /**
   * Check if a date is in the interval.
   *
   * @param {Date} date - The date to check.
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   * @returns {boolean} True if the date is in the interval.
   */
  isBetween (date: Date, startDate: Date, endDate: Date): boolean {
    const day = new Day(date)
    return day.isBetween(new TimeInterval(startDate, endDate))
  }

  /**
   * Get the start of the week.
   *
   * @param {Date} date - The specified date.
   * @returns {Date} The start of the week.
   */
  startOfWeek (date: Date): Date {
    const week = new Week(date)
    return week.getStartOfWeek()
  }

  /**
   * Get the end of the week.
   *
   * @param {Date} date - The specified date.
   * @returns {Date} The end of the week.
   */
  endOfWeek (date: Date): Date {
    const week = new Week(date)
    return week.getEndOfWeek()
  }

  /**
   * Get the number of days until the weekend (Saturday). If the date argument is a Sunday, it counts the days until the next weekend.
   *
   * @param {Date | number} date - The specified date or a timestamp that represents the date.
   * @returns {number} The number of days until the weekend.
   */
  getDaysUntilWeekend (date: Date | number = Date.now()): number {
    const day = new Day(date)
    return day.getDaysUntilWeekend()
  }

  /**
   * Get the number of working days between two dates.
   *
   * @param {Date} startDate - The starting date.
   * @param {Date} endDate - The end date.
   * @returns {number} The number of working days.
   */
  countWorkingDays (startDate: Date, endDate: Date): number {
    const timeInterval = new TimeInterval(startDate, endDate)
    return timeInterval.getNumberOfWorkingDays()
  }

  /**
   * Add days to the date.
   *
   * @param {Date} date - The specified date.
   * @param {number} numberOfDays - The number of days to add.
   * @returns {Date} The date with the added days.
   */
  addDays (date: Date, numberOfDays: number): Date {
    const day = new Day(date)
    return day.getFutureDate(numberOfDays)
  }

  /**
   * Remove days from the date.
   *
   * @param {Date} date - The specified date.
   * @param {number} numberOfDays - The number of days to remove.
   * @returns {Date} The date with the added days.
   */
  removeDays (date: Date, numberOfDays: number): Date {
    const day = new Day(date)
    return day.getPastDate(numberOfDays)
  }
}
