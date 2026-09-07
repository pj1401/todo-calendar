/**
 * @file The Year class.
 * @author Patricia Johansson
 * @version 1.0.0
 */

/**
 * Represents a year.
 */
export default class Year {
  /**
   * An integer that represents the year.
   *
   * @type {number}
   */
  #year: number

  /**
   * Initialises a new instance.
   *
   * @param {Date} date - Any date that is in the year.
   */
  constructor (date: Date) {
    this.#year = date.getFullYear()
  }

  /**
   * Returns true if the year is a leap year.
   *
   * @returns {boolean} True if the year is a leap year.
   */
  isLeapYear (): boolean {
    /**
     * @see https://en.wikipedia.org/wiki/Leap_year
     * each year that is a multiple of 4, except for years evenly divisible by 100 but not by 400
     */
    return ((this.#year % 4) === 0 && (this.#year % 100) !== 0) || ((this.#year % 400) === 0)
  }

  /**
   * Returns true if 31 December is in week 1 of the following year.
   *
   * @returns {boolean} True if 31 December is in week 1 of the following year.
   */
  endsOnWeek1 (): boolean {
    const lastDay = new Date(`${this.#year}-12-31`)
    const weekDay = this.#getWeekdayString(lastDay)

    /**
     * @see https://en.wikipedia.org/wiki/ISO_week_date#Last_week
     * If 31 December is on a Monday, Tuesday, or Wednesday it is in W01 of the next year.
     */
    return weekDay === 'Monday' || weekDay === 'Tuesday' || weekDay === 'Wednesday'
  }

  /**
   * Returns true if the year has 53 weeks.
   *
   * @returns {boolean} True if the year has 53 weeks.
   */
  has53weeks (): boolean {
    /**
     * @see https://en.wikipedia.org/wiki/ISO_week_date#Weeks_per_year
     */
    const firstDay = new Date(`${this.#year}-01-01`)
    const lastDay = new Date(`${this.#year}-12-31`)

    const firstDayIsThursday = this.#getWeekdayString(firstDay) === 'Thursday'
    const firstDayIsWednesday = this.#getWeekdayString(firstDay) === 'Wednesday'
    const lastDayIsThursday = this.#getWeekdayString(lastDay) === 'Thursday'
    const lastDayIsFriday = this.#getWeekdayString(lastDay) === 'Friday'

    return firstDayIsThursday || (firstDayIsWednesday && this.isLeapYear()) ||
    lastDayIsThursday || (lastDayIsFriday && this.isLeapYear())
  }

  /**
   * Get the day of the week as a readable string.
   *
   * @param {Date} date - The specified date.
   * @returns {string} The day of the week.
   */
  #getWeekdayString (date: Date): string {
    interface WeekDayMap {
      [index: number]: string;
    }
    const weekdayStringMap: WeekDayMap = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }
    return weekdayStringMap[date.getDay()]
  }

  /**
   * Get the number of weeks in a year.
   *
   * @returns {number} The number of weeks in the year.
   */
  getWeeksPerYear (): number {
    let weeks = 52
    if (this.has53weeks()) {
      weeks = 53
    }
    return weeks
  }
}
