import m from 'mithril'

interface YearSelectorAttrs {
  year: number
}

export const YearSelector: m.ClosureComponent<YearSelectorAttrs> = () => {
  return {
    view: ({ attrs: { year } }) => {
      return m('div', { class: 'year-selector' },
        m('span', `${year}`),
      )
    },
  }
}
