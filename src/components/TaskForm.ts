import m from 'mithril'
import ToDo from '../models/ToDo.js'

export const TaskForm = () => {
  return {
    view: () => {
      return m('div',
        m('input', { type: 'text', id: 'new-todo', placeholder: 'New ToDo', value: ToDo.task,
          oninput: (event: InputEvent) => {
            // TypeScript requires that the type of event.target is known.
            const value = (event.target as HTMLInputElement).value

            ToDo.setTask(value)
          } }),
        m('button', { type: 'button', id: 'new-todo-done-btn', disabled: !ToDo.canSubmit(),
          onclick: () => {
            ToDo.reset()
          } }, 'Done'),
      )
    },
  }
}
