import m from 'mithril'
import { getDaysInMonth } from '@pj1401/date-utils'

// TODO: Move this to date-utils
const currentDate = new Date()
const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
const days = Array.from({ length: daysInMonth }, (v, i) => i + 1)

/**
 * Get the day of the week represented by a number. 0 represents Sunday.
 * @param {number} year The year the month is in.
 * @param {number} month The number representing the month. Zero-based, 0 represents January.
 * @returns {number} A number representing the day of the week.
 */
function firstDayOfMonth (year: number, month: number): number {
  const date = new Date(year, month, 1)
  return date.getDay()
}

export const Month = () => {
  return {
    view: () => {
      return m('div', { class: 'month', style: `grid-column-start: ${firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())}` },
        days.map((day, _) => m('span', day)),
      )
    },
  }
}
