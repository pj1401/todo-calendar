import m from 'mithril'

export const Task = () => {
  return {
    view: () => {
      return m('div',
        m('input', { type: 'checkbox' }),
        m('label', 'Task'),
      )
    },
  }
}
