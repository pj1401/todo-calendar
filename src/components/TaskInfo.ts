import m from 'mithril'
import TaskModel from '../models/TaskModel.js'

interface TaskInfoAttrs {
  task: TaskModel
  onRemove: () => void
}

export const TaskInfo: m.ClosureComponent<TaskInfoAttrs> = () => {
  return {
    view: ({ attrs: { task, onRemove } }) => {
      return m('div', { class: 'task-info' },
        m('span', task.title),
        m('span', task.getDateString()),
        m('button', {
          class: 'close-task-info-btn',
          onclick: onRemove,
          ariaLabel: 'Close task info',
        }, 'X'),
      )
    },
  }
}
