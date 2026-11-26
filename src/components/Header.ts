import m from 'mithril'
import { weekdays } from '../util/calendar.js'

export const Header = () => {
  return {
    view: () => {
      return m('div', { class: 'header' },
        weekdays.map((weekday) => m('span', weekday.slice(0, 3))),
      )
    },
  }
}
