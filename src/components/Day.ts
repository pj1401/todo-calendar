import m from 'mithril'

interface DayAttrs {
  day: number
  startColumn?: number
}

export const Day: m.ClosureComponent<DayAttrs> = () => {
  return {
    view: ({ attrs: { day, startColumn } }) => {
      return m('div', {
        class: 'day',
        style: startColumn ? { gridColumnStart: startColumn } : undefined,
      },
      m('span', day),
      )
    },
  }
}
