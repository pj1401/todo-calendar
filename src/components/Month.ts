import m from 'mithril'
import { getMonthDays } from '@pj1401/date-utils'
import { Day } from './Day.js'
import { getStartColumn, isStartDay } from '../util/calendar.js'
import TaskModel from '../models/TaskModel.js'
import { TaskActions } from '../types/taskActions.js'
import { InfoPanel } from '../types/info.js'

interface MonthAttrs {
  tasks: TaskModel[]
  year: number
  month: number
  actions: TaskActions
  info: InfoPanel
}

export const Month: m.ClosureComponent<MonthAttrs> = () => {
  return {
    view: ({ attrs: { tasks, year, month, actions, info } }) => {
      const days = getMonthDays(year, month)
      const startColumn = getStartColumn(year, month)
      return m('div', { class: 'month' },
        days.map((day, i) => m(Day, {
          day,
          startColumn: isStartDay(i, startColumn),
          tasks: tasks.filter((task) => task.isOnDay(year, month, day)),
          actions,
          info,
        })),
      )
    },
  }
}
