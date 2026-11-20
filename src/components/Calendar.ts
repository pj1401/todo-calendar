import m from 'mithril'
import { Month } from './Month'

export const Calendar = () => {
  return {
    view: () => {
      return m('div', { class: 'calendar' },
        m(Month),
      )
    },
  }
}
