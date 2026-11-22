import m from 'mithril'
import { Month } from './Month.js'
import { Header } from './Header.js'
import { months } from '../util/calendar.js'
import TaskModel from '../models/TaskModel.js'
import { TaskRepository } from '../models/TaskRepository.js'
import { MonthSelector } from './MonthSelector.js'
import { YearSelector } from './YearSelector.js'

interface CalendarAttrs {
  tasks: TaskModel[]
  onToggle: TaskRepository['toggle']
}

export const Calendar: m.ClosureComponent<CalendarAttrs> = () => {
  const now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth()

  /**
   * Set new values for year and month.
   * @param {number} newYear The new value of year.
   * @param {number} newMonth The new value of month.
   */
  const setDate = (newYear: number, newMonth: number) => {
    // Use Date constructor to normalise out-of-range values.
    // Month indexes outside of range 0-11 changes the year value.
    const newDate = new Date(newYear, newMonth, 1)
    year = newDate.getFullYear()
    month = newDate.getMonth()
  }

  return {
    view: ({ attrs: { tasks, onToggle }}) => {
      return m('div', { class: 'calendar' },
        m('span', `${months[month]} ${year}`),
        m(MonthSelector, { month, onChange: (newMonth) => setDate(year, newMonth) }),
        m(YearSelector, { year, onChange: (newYear) => setDate(newYear, month) }),
        m(Header),
        m(Month, { tasks, onToggle, year, month }),
      )
    },
  }
}
