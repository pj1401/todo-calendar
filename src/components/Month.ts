import m from 'mithril'
import { getMonthDays } from '@pj1401/date-utils'
import { Day } from './Day.js'
import { getStartColumn, isStartDay } from '../util/calendar.js'
import TaskModel from '../models/TaskModel.js'
import { TaskRepository } from '../models/TaskRepository.js'

interface MonthAttrs {
  tasks: TaskModel[]
  onToggle: TaskRepository['toggle']
}

export const Month: m.ClosureComponent<MonthAttrs> = () => {
  return {
    view: ({ attrs: { tasks, onToggle } }) => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      const days = getMonthDays(year, month)
      const startColumn = getStartColumn(year, month)
      return m('div', { class: 'month' },
        days.map((day, i) => m(Day, {
          day,
          startColumn: isStartDay(i, startColumn),
          tasks: tasks.filter((task) => task.isOnDay(year, month, day)),
          onToggle,
        })),
      )
    },
  }
}
