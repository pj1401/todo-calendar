import m from 'mithril'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const Header = () => {
  return {
    view: () => {
      return m('div', { class: 'header' },
        weekdays.map(weekday => m('span', weekday)),
      )
    },
  }
}
