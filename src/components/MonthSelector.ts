import m from 'mithril'
import { months } from '../util/calendar.js'

interface MonthSelectorAttrs {
  month: number
  onChange: (month: number) => void
}

export const MonthSelector: m.ClosureComponent<MonthSelectorAttrs> = () => {
  return {
    view: ({ attrs: { month } }) => {
      return m('div', { class: 'month-selector' },
        m('span', `${months[month]}`),
      )
    },
  }
}
