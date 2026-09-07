/**
 * @file The TimeInterval class.
 * @author Patricia Johansson
 * @version 1.0.0
 */

/**
 * Represents an interval of time.
 */
export default class TimeInterval {
  startDate: Date
  endDate: Date

  /**
   * Initialises a new instance.
   *
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   */
  constructor (startDate: Date, endDate: Date) {
    this.startDate = startDate
    this.endDate = endDate
  }

  /**
   * Get the dates in the time interval.
   *
   * @returns {Date[]} An array of Date objects.
   */
  getDatesBetween (): Date[] {
    const dates = []
    const currentDate = new Date(this.startDate)
    const finalDate = new Date(this.endDate)
    currentDate.setUTCHours(0, 0, 0, 0)
    finalDate.setUTCHours(0, 0, 0, 0)

    if (currentDate > finalDate) {
      throw new RangeError('The start date must be earlier than the end date.')
    }

    // Use a re-assignable variable for the while loop. Linter complains otherwise.
    let currentTimestamp = currentDate.getTime()
    const finalDateTimestamp = finalDate.getTime()

    while (currentTimestamp <= finalDateTimestamp) {
      const year = currentDate.getUTCFullYear()
      const month = currentDate.getUTCMonth()
      const day = currentDate.getUTCDate()
      dates.push(new Date(year, month, day))

      currentDate.setUTCDate(currentDate.getUTCDate() + 1)
      currentTimestamp = currentDate.getTime()
    }

    return dates
  }

  /**
   * Get the number of working days in the interval.
   *
   * @returns {number} The number of working days.
   */
  getNumberOfWorkingDays (): number {
    const dates = this.getDatesBetween()
    const sunday = 0
    const saturday = 6
    let count = 0
    for (const date of dates) {
      const day = date.getDay()
      if (day !== saturday && day !== sunday) {
        count++
      }
    }
    return count
  }
}
