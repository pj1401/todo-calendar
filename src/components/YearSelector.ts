import m from 'mithril'

interface YearSelectorAttrs {
  year: number
  onChange: (month: number) => void
}

export const YearSelector: m.ClosureComponent<YearSelectorAttrs> = () => {
  return {
    view: ({ attrs: { year, onChange } }) => {
      return m('div', { class: 'year-selector' },
        m('button', { onclick: () => onChange(year - 1) }, '<'),
        m('span', `${year}`),
        m('button', { onclick: () => onChange(year + 1) }, '>'),
      )
    },
  }
}
