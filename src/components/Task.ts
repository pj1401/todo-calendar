import m from 'mithril'
import TaskStore from '../models/TaskStore.js'
import TaskModel from '../models/TaskModel.js'

export const Task: m.ClosureComponent<{ task: TaskModel }> = () => {
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
        m('span', task.getDateString()),
      )
    },
  }
}
