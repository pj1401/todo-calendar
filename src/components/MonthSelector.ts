import m from 'mithril'
import { months } from '../util/calendar.js'

interface MonthSelectorAttrs {
  month: number
  onChange: (month: number) => void
}

export const MonthSelector: m.ClosureComponent<MonthSelectorAttrs> = () => {
  return {
    view: ({ attrs: { month, onChange } }) => {
      return m('div', { class: 'month-selector' },
        m('button', { onclick: () => onChange(month - 1), ariaLabel: 'Previous month' }, '<'),
        m('span', `${months[month]}`),
        m('button', { onclick: () => onChange(month + 1), ariaLabel: 'Next month' }, '>'),
      )
    },
  }
}
