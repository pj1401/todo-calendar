import m from 'mithril'

export const TaskForm = () => {
  return {
    view: () => {
      return m('div',
        m('input', { type: 'text', id: 'new-todo', placeholder: 'New ToDo' }),
        m('button', { type: 'button', id: 'new-todo-done-btn' }, 'Done'),
      )
    },
  }
}
