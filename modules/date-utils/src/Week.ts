/**
 * @file The Week class.
 * @author Patricia Johansson
 * @version 1.0.0
 */

import Day from './Day.js'
import Year from './Year.js'

/**
 * Represents a Week.
 */
export default class Week {
  #date
  #day

  /**
   * Initialises a new instance.
   *
   * @param {Date} date - Any date that is in the week.
   */
  constructor (date: Date) {
    this.#date = new Date(date)
    this.#day = new Day(date)
  }

  /**
   * Get the week number.
   *
   * @returns {number} The week number.
   */
  getWeekNumber (): number {
    /**
     * @see https://en.wikipedia.org/wiki/ISO_week_date#Calculating_the_week_number_from_an_ordinal_date
     */
    const dayOfTheWeek = this.#getDayOfTheWeek(this.#date)
    const week = Math.trunc((10 + (this.#day.getDayOfYear() - dayOfTheWeek)) / 7)
    let weekOfTheYear = week

    // Check if the calculated week is the last week or first week of the year.
    if (week < 1) {
      // Get the number of weeks from the preceding year.
      const precedingYear = new Year(new Date(`${this.#date.getFullYear() - 1}-01`))
      weekOfTheYear = precedingYear.getWeeksPerYear()
    } else if (week === 53) {
      // Check if it is in week 1 of the following year.
      const year = new Year(this.#date)
      if (year.endsOnWeek1()) {
        weekOfTheYear = 1
      } else {
        weekOfTheYear = week
      }
    }
    return weekOfTheYear
  }

  /**
   * Get the day of the week, represented by a number.
   *
   * @param {Date} date - The specified date.
   * @returns {number} A number that represents the day of the week. 1 represents Monday, 7 for Sunday.
   */
  #getDayOfTheWeek (date: Date): number {
    // getDay() returns 0 for Sunday, but Sunday has to be 7 for the formula to work.
    let weekday = 7
    if (date.getDay() !== 0) {
      weekday = date.getDay()
    }
    return weekday
  }

  /**
   * Get the start of the week (Monday).
   *
   * @returns {Date} The start of the week.
   */
  getStartOfWeek (): Date {
    const weekday = this.#date.getDay()
    const weekStart = new Date(this.#date)
    switch (weekday) {
      case 0: // Sunday
        weekStart.setDate(this.#date.getDate() - 6)
        break
      case 2: // Tuesday
        weekStart.setDate(this.#date.getDate() - 1)
        break
      case 3:
        weekStart.setDate(this.#date.getDate() - 2)
        break
      case 4:
        weekStart.setDate(this.#date.getDate() - 3)
        break
      case 5:
        weekStart.setDate(this.#date.getDate() - 4)
        break
      case 6: // Saturday
        weekStart.setDate(this.#date.getDate() - 5)
        break
      default:
        break
    }
    weekStart.setHours(0, 0, 0, 0)
    return weekStart
  }

  /**
   * Get the end of the week (Sunday).
   *
   * @returns {Date} The end of the week.
   */
  getEndOfWeek (): Date {
    const weekday = this.#date.getDay()
    const weekEnd = new Date(this.#date)
    switch (weekday) {
      case 1: // Monday
        weekEnd.setDate(this.#date.getDate() + 6)
        break
      case 2: // Tuesday
        weekEnd.setDate(this.#date.getDate() + 5)
        break
      case 3:
        weekEnd.setDate(this.#date.getDate() + 4)
        break
      case 4:
        weekEnd.setDate(this.#date.getDate() + 3)
        break
      case 5:
        weekEnd.setDate(this.#date.getDate() + 2)
        break
      case 6: // Saturday
        weekEnd.setDate(this.#date.getDate() + 1)
        break
      default:
        break
    }
    weekEnd.setHours(0, 0, 0, 0)
    return weekEnd
  }
}
