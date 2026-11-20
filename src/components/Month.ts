import m from 'mithril'
import { getFirstDayOfMonth, getMonthDays } from '@pj1401/date-utils'

const currentDate = new Date()
const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth())

// Add 1 to get the correct grid-column-start value.
// The value should not be 0 for the grid to display correctly.
const startDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) + 1

export const Month = () => {
  return {
    view: () => {
      return m('div', { class: 'month' },
        days.map((day, i) => m('span', i === 0 ? { style: `grid-column-start: ${startDay};`} : {}, day)),
      )
    },
  }
}
