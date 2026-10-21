import m from 'mithril'
import ToDo from '../models/ToDo.js'
import TaskStore from '../models/TaskStore.js'

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
        m('input', { type: 'date', id: 'new-todo-date', value: ToDo.date,
          oninput: (event: InputEvent) => {
            const value = (event.target as HTMLInputElement).value
            ToDo.setDate(value)
          } }),
        m('button', { type: 'button', id: 'new-todo-done-btn', disabled: !ToDo.canSubmit(),
          onclick: () => {
            TaskStore.add(ToDo.task)
            ToDo.reset()
          } }, 'Done'),
      )
    },
  }
}
