import m from 'mithril'
import { Month } from './Month.js'
import { Header } from './Header.js'
import { months } from '../util/calendar.js'
import TaskModel from '../models/TaskModel.js'
import { TaskRepository } from '../models/TaskRepository.js'

interface CalendarAttrs {
  tasks: TaskModel[]
  onToggle: TaskRepository['toggle']
}

export const Calendar: m.ClosureComponent<CalendarAttrs> = () => {
  return {
    view: ({ attrs: { tasks, onToggle }}) => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      return m('div', { class: 'calendar' },
        m('span', `${months[month]} ${year}`),
        m(Header),
        m(Month, { tasks, onToggle }),
      )
    },
  }
}
