/**
 * @file The Month class.
 * @author Patricia Johansson
 * @version 1.0.0
 */

/**
 * Represents a month.
 */
export default class Month {
  /**
   * An integer that represents the month.
   *
   * @type {number}
   */
  #month: number

  /**
   * Initialises a new instance.
   *
   * @param {Date} date - Any date that is in the month.
   */
  constructor (date: Date) {
    this.#month = date.getMonth()
  }

  /**
   * Get the quarter of the year the month is in.
   *
   * @returns {number} A number representing the quarter of the year.
   */
  getYearQuarter (): number {
    let quarter = 4
    if (this.#month < 3) {
      quarter = 1
    } else if (this.#month < 6) {
      quarter = 2
    } else if (this.#month < 9) {
      quarter = 3
    }
    return quarter
  }
}
