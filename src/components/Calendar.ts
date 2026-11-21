import m from 'mithril'
import { Month } from './Month.js'
import { Header } from './Header.js'
import { months } from '../util/calendar.js'
import TaskModel from '../models/TaskModel.js'

export const Calendar: m.ClosureComponent<{ tasks: TaskModel[] }> = () => {
  return {
    view: () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      return m('div', { class: 'calendar' },
        m('span', `${months[month]} ${year}`),
        m(Header),
        m(Month),
      )
    },
  }
}
