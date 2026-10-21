import { TaskItem } from './TaskStore'
import { DateUtil } from '@pj1401/date-utils'

const dateUtil = new DateUtil()

export default class Task implements TaskItem {
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
    if (this.date.trim() !== '') {
      dateString = ` ${dateUtil.countDays(date)} days`
    }
    return dateString
  }
}
