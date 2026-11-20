import m from 'mithril'
import { getMonthDays } from '@pj1401/date-utils'
import { Day } from './Day'
import { getStartColumn, isStartDay } from '../util/calendar.js'

export const Month = () => {
  return {
    view: () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      const days = getMonthDays(year, month)
      const startColumn = getStartColumn(year, month)
      return m('div', { class: 'month' },
        days.map((day, i) => m(Day, { day, startColumn: isStartDay(i, startColumn) })),
      )
    },
  }
}
