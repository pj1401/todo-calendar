import m from 'mithril'
import { Month } from './Month'
import { Header } from './Header'
import { months } from '../util/calendar.js'

export const Calendar = () => {
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
