/**
 * @file The Day class.
 * @author Patricia Johansson
 * @version 1.0.0
 */

import TimeInterval from './TimeInterval.js'

const MILLISECONDS_PER_DAY: number = 1000 * 60 * 60 * 24

/**
 * Represents a Day.
 */
export default class Day {
  #date: Date

  /**
   * Initialises a new instance.
   *
   * @param {Date | number} date - The specified date or a timestamp that represents the date.
   */
  constructor (date: Date | number) {
    this.#date = new Date(date)
  }

  /**
   * Count days passed or days until the day.
   *
   * @returns {number} The number of days.
   */
  getDays (): number {
    const dateNow = this.#getMidnightTimestamp(Date.now())
    const targetDate = this.#getMidnightTimestamp(this.#date)

    // Time difference will be positive if the target date is in the future.
    const timeDifference = targetDate - dateNow

    const days = timeDifference / MILLISECONDS_PER_DAY

    let dayCount = 0
    if (days >= 0) {
      // Round up if the date is in the future, to include part of a day.
      dayCount = Math.ceil(days)
    } else {
      // Round down if the date is in the past. Only count whole days.
      dayCount = Math.floor(days)
    }
    return dayCount
  }

  /**
   * Get the timestamp for midnight of the specified date.
   *
   * @param {Date | number} date - The specified date or a timestamp that represents the date.
   * @returns {number} The date timestamp with the time set to midnight.
   */
  #getMidnightTimestamp (date: Date | number): number {
    const targetDate = new Date(date)
    return targetDate.setHours(0, 0, 0, 0)
  }

  /**
   * Get the day of the year.
   *
   * @returns {number} A number that represents the day of the year.
   */
  getDayOfYear (): number {
    // Use UTC to avoid daylight savings problems.
    const startOfYear = Date.UTC(this.#date.getFullYear(), 0, 0)
    const targetDate = Date.UTC(this.#date.getFullYear(), this.#date.getMonth(), this.#date.getDate())
    return (targetDate - startOfYear) / MILLISECONDS_PER_DAY
  }

  /**
   * Get the difference between two dates.
   *
   * @param {Date} date2 - The second date.
   * @returns {number} The number of days between the dates.
   */
  getDaysBetween (date2: Date): number {
    // Use UTC to avoid daylight savings problems.
    const date1UTC = Date.UTC(this.#date.getFullYear(), this.#date.getMonth(), this.#date.getDate())
    const date2UTC = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())
    return (date2UTC - date1UTC) / MILLISECONDS_PER_DAY
  }

  /**
   * Check if the day is in the interval.
   *
   * @param {TimeInterval} interval - The time interval.
   * @returns {boolean} True if the date is in the interval.
   */
  isBetween (interval: TimeInterval): boolean {
    return this.#date >= interval.startDate && this.#date <= interval.endDate
  }

  /**
   * Add days to the date.
   *
   * @param {number} numberOfDays - The number of days to add.
   * @returns {Date} The date with the added days.
   */
  getFutureDate (numberOfDays: number): Date {
    const targetDate = new Date(this.#date)
    targetDate.setDate(targetDate.getDate() + numberOfDays)
    return targetDate
  }

  /**
   * Remove days from the date.
   *
   * @param {number} numberOfDays - The number of days to remove.
   * @returns {Date} The date with the added days.
   */
  getPastDate (numberOfDays: number): Date {
    const targetDate = new Date(this.#date)
    targetDate.setDate(targetDate.getDate() - numberOfDays)
    return targetDate
  }

  /**
   * Get the number of days until the weekend.
   *
   * @returns {number} The number of days.
   */
  getDaysUntilWeekend (): number {
    const saturday = 6
    const weekday = this.#date.getDay()
    return saturday - weekday
  }
}
