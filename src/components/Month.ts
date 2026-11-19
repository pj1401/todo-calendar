import m from 'mithril'
import { getDaysInMonth } from '@pj1401/date-utils'

const currentDate = new Date()
const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
const days = Array.from({ length: daysInMonth }, (v, i) => i + 1)

export const Month = () => {
  return {
    view: () => {
      return m('div',
        days.map((day, i) => m('span', day)),
      )
    },
  }
}
