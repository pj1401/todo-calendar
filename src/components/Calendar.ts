import m from 'mithril'
import { Month } from './Month'
import { Header } from './Header'

export const Calendar = () => {
  return {
    view: () => {
      return m('div', { class: 'calendar' },
        m(Header),
        m(Month),
      )
    },
  }
}
