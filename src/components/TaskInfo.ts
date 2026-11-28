import m from 'mithril'
import TaskModel from '../models/TaskModel.js'

interface TaskInfoAttrs {
  task: TaskModel
  onClose: () => void
  onDelete: () => void
}

export const TaskInfo: m.ClosureComponent<TaskInfoAttrs> = () => {
  return {
    view: ({ attrs: { task, onClose, onDelete } }) => {
      return m('div', { class: 'task-info' },
        m('div', { class: 'task-info-btn-row' },
          m('button', {
            class: 'close-task-info-btn',
            onclick: onClose,
            ariaLabel: 'Close ToDo info',
          }, 'X'),
        ),
        m('div', { class: 'task-info-content' },
          m('span', task.getTitle()),
          m('span', task.getDateString()),
          m('span', task.getWordCountInfo()),
        ),
        m('div', { class: 'task-info-btn-row' },
          m('button', { onclick: onDelete }, 'Delete'),
        ),
      )
    },
  }
}
