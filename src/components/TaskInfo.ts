import m from 'mithril'
import TaskModel from '../models/TaskModel.js'

interface TaskInfoAttrs {
  task: TaskModel
  onClose: () => void
}

export const TaskInfo: m.ClosureComponent<TaskInfoAttrs> = () => {
  return {
    view: ({ attrs: { task, onClose } }) => {
      return m('div', { class: 'task-info' },
        m('div',
          m('span', task.title),
          m('span', task.getDateString()),
          m('button', {
            class: 'close-task-info-btn',
            onclick: onClose,
            ariaLabel: 'Close task info',
          }, 'X'),
        ),
        m('div', { class: 'task-info-btn-row' },
          m('button', 'Delete'),
        ),
      )
    },
  }
}
