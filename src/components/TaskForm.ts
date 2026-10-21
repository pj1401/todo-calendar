import m from 'mithril'
import ToDo from '../models/ToDo.js'

export const TaskForm = () => {
  return {
    view: () => {
      return m('div',
        m('input', { type: 'text', id: 'new-todo', placeholder: 'New ToDo', value: ToDo.task,
          oninput: (event: InputEvent) => {
            const target = event.target as HTMLInputElement
            if (target) {
              ToDo.setTask(target.value)
            }
          } }),
        m('button', { type: 'button', id: 'new-todo-done-btn', disabled: !ToDo.canSubmit(),
          onclick: () => {
            ToDo.reset()
          } }, 'Done'),
      )
    },
  }
}
