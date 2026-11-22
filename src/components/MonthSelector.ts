import m from 'mithril'
import { months } from '../util/calendar.js'

export const MonthSelector: m.ClosureComponent = () => {
  return {
    view: () => {
      const now = new Date()
      const month = now.getMonth()
      return m('div', { class: 'month-selector' },
        m('span', `${months[month]}`),
      )
    },
  }
}
