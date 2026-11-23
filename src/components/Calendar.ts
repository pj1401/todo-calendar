import m from 'mithril'
import { Month } from './Month.js'
import { Header } from './Header.js'
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
  let openInfoTaskId: string | null = null

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

  /**
   * Handler for updating the Month view.
   * @param {number} newYear The new value of year.
   * @param {number} newMonth The new value of month.
   */
  const changeDate = (newYear: number, newMonth: number) => {
    setDate(newYear, newMonth)
    openInfoTaskId = null
  }

  const onOpenInfo = (taskId: string) => {
    openInfoTaskId = taskId
  }

  const onCloseInfo = () => {
    openInfoTaskId = null
  }

  return {
    view: ({ attrs: { tasks, onToggle }}) => {
      return m('div', { class: 'calendar' },
        m(MonthSelector, { month, onChange: (newMonth) => changeDate(year, newMonth) }),
        m(YearSelector, { year, onChange: (newYear) => changeDate(newYear, month) }),
        m(Header),
        m(Month, {
          tasks,
          onToggle,
          year,
          month,
          openInfoTaskId,
          onOpenInfo,
          onCloseInfo,
        }),
      )
    },
  }
}
