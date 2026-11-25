import m from 'mithril'
import { Month } from './Month.js'
import { Header } from './Header.js'
import TaskModel from '../models/TaskModel.js'
import { MonthSelector } from './MonthSelector.js'
import { YearSelector } from './YearSelector.js'
import { InfoPanel } from '../types/info.js'
import { TaskActions } from '../types/taskActions.js'

interface CalendarAttrs {
  tasks: TaskModel[]
  actions: TaskActions
  info: InfoPanel
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
    view: ({ attrs: { tasks, actions, info }}) => {
      /**
       * Handler for updating the Month view.
       * @param {number} newYear The new value of year.
       * @param {number} newMonth The new value of month.
       */
      const changeDate = (newYear: number, newMonth: number) => {
        setDate(newYear, newMonth)
        info.close()
      }

      return m('div', { class: 'calendar' },
        m('div', { class: 'selectors' },
          m(MonthSelector, { month, onChange: (newMonth) => changeDate(year, newMonth) }),
          m(YearSelector, { year, onChange: (newYear) => changeDate(newYear, month) }),
        ),
        m(Header),
        m(Month, {
          tasks,
          year,
          month,
          actions,
          info,
        }),
      )
    },
  }
}
