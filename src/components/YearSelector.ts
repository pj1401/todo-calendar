import m from 'mithril'

export const YearSelector: m.ClosureComponent = () => {
  return {
    view: () => {
      const now = new Date()
      const year = now.getFullYear()
      return m('div', { class: 'year-selector' },
        m('span', `${year}`),
      )
    },
  }
}
