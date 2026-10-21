import m from 'mithril'
import TaskStore, { TaskItem } from '../models/TaskStore.js'

export const Task: m.ClosureComponent<{ task: TaskItem }> = () => {
  return {
    view: ({ attrs: { task } }) => {
      return m('div',
        m('input', {
          type: 'checkbox',
          checked: task.completed,
          id: `task-${task.id}`,
          onchange: () => TaskStore.toggle(task.id),
        }),
        m('label', { for: `task-${task.id}` }, task.title),
      )
    },
  }
}
