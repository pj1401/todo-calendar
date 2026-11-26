import { DateUtil } from '@pj1401/date-utils'

const dateUtil = new DateUtil()

export interface TaskItem {
  id: string
  title: string
  completed: boolean
  date: string
}

export default class TaskModel implements TaskItem {
  id: string
  title: string
  completed: boolean
  date: string

  constructor (id: string, title: string, completed: boolean, date: string) {
    this.id = id
    this.title = title
    this.completed = completed
    this.date = date
  }

  /**
   * Returns a string with the number of days left for a task. If the date is empty an empty string is returned.
   * @returns {string} The string with the days left.
   */
  getDateString (): string {
    const date = new Date(`${this.date}T00:00:00`)
    let dateString = ''
    if (this.dateIsNotEmpty()) {
      const timeDistance = this.#getTimeFromNow(date)
      dateString = `${timeDistance}`
    }
    return dateString
  }

  /**
   * Get a string representing the time between a date and now.
   * @param {number} date The date to compare the current time with.
   * @returns {string} The string representing time distance in days.
   */
  #getTimeFromNow(date: Date): string {
    const days = dateUtil.countDays(date)
    let timeString = ''
    if (days === 0) {
      timeString = 'Today'
    }
    // TODO: change string depending on date is in the future or the past.
    return timeString
  }

  /**
   * Checks if a Task has a date.
   * @returns {boolean} True if the task has a set date.
   */
  dateIsNotEmpty (): boolean {
    return this.date.trim() !== ''
  }

  /**
   * Checks if the task is on the given day.
   * @param {number} year - The full year.
   * @param {number} month The month index (0-11). Zero-based, 0 represents January.
   * @param {number} day - The day of the month.
   * @returns {boolean} True if the task's date is that day.
   */
  isOnDay (year: number, month: number, day: number): boolean {
    const date = new Date(`${this.date}T00:00:00`)
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
  }
}
