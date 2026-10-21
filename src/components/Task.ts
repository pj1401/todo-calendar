import m from 'mithril'
import TaskStore, { TaskItem } from '../models/TaskStore.js'

export const Task: m.ClosureComponent<{ task: TaskItem }> = () => {
  return {
    view: ({ attrs: { task } }) => {
      return m('div',
        m('input', {
          type: 'checkbox',
          checked: task.completed,
          onchange: () => TaskStore.toggle(task.id),
        }),
        m('label', task.title),
      )
    },
  }
}
