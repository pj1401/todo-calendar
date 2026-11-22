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
  const year = now.getFullYear()
  const month = now.getMonth()

  return {
    view: ({ attrs: { tasks, onToggle }}) => {
      return m('div', { class: 'calendar' },
        m('span', `${months[month]} ${year}`),
        m(MonthSelector, { month }),
        m(YearSelector, { year }),
        m(Header),
        m(Month, { tasks, onToggle, year, month }),
      )
    },
  }
}
