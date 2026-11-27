import { DateUtil } from '@pj1401/date-utils'
import { convertWeekdayMondayStart, months, weekdays } from '../util/calendar.js'
import { TextCounter } from 'glyphalyze'

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
      const timeDistance = this.#getDaysFromNow(date)
      dateString = `${this.#formatDateString(date)}, ${timeDistance}`
    }
    return dateString
  }

  #formatDateString (date: Date): string {
    return `${weekdays[convertWeekdayMondayStart(date.getDay())]}, ${date.getDate()} ${months[date.getMonth()]}`
  }

  /**
   * Get a string representing the number of days between a date and now.
   * @param {number} date The date to compare the current time with.
   * @returns {string} The string representing time distance in days.
   */
  #getDaysFromNow (date: Date): string {
    const days = dateUtil.countDays(date)
    let timeString = ''
    if (days === 0) {
      timeString = 'Today'
    } else if (days > 1) {
      timeString = `${days} days left`
    } else if (days < -1) {
      timeString = `${Math.abs(days)} days ago`
    } else if (days === 1) {
      timeString = 'Tomorrow'
    } else if (days === -1) {
      timeString = 'Yesterday'
    }
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

  /**
   * Get a string with info about the ToDo title.
   * @returns {string} A string stating the number of words in the ToDo title.
   */
  getWordCountInfo (): string {
    const counter = new TextCounter(this.title)
    const words = counter.countWords()
    let wordInfo
    if (words === 1) {
      wordInfo = `${words} word in ToDo title`
    } else {
      wordInfo = `${words} words in ToDo title`
    }
    return wordInfo
  }
}
