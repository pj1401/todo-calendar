import m from 'mithril'
import ToDo from '../models/ToDo.js'

interface TaskFormAttrs {
  onAdd: (title: string, date: string) => void | Promise<void>
}

export const TaskForm: m.ClosureComponent<TaskFormAttrs> = () => {
  return {
    view: ({ attrs: { onAdd } }) => {
      return m('div', { class: 'task-form' },
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
          onclick: async () => {
            await onAdd(ToDo.task, ToDo.date)
            ToDo.reset()
          } }, 'Done'),
      )
    },
  }
}
