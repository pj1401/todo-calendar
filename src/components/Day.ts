import m from 'mithril'

export const Day: m.ClosureComponent<{ day: number }> = () => {
  return {
    view: ({ attrs: { day } }) => {
      return m('div', { class: 'day' },
        m('span', day),
      )
    },
  }
}
