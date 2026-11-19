import m from 'mithril'
import { getDaysInMonth } from '@pj1401/date-utils'

// TODO: Move this to date-utils?
const currentDate = new Date()
const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
const days = Array.from({ length: daysInMonth }, (v, i) => i + 1)

export const Month = () => {
  return {
    view: () => {
      return m('div', { class: 'month' },
        days.map((day, i) => m('span', day)),
      )
    },
  }
}
