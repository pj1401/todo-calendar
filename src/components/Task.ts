import m from 'mithril'
import TaskModel from '../models/TaskModel.js'
import { TaskInfo } from './TaskInfo.js'
import { TaskRepository } from '../models/TaskRepository.js'

interface TaskAttrs {
  task: TaskModel
  isInfoOpen: boolean
  onToggle: () => void
  onDelete: TaskRepository['delete']
  onOpenInfo: () => void
  onCloseInfo: () => void
}

export const Task: m.ClosureComponent<TaskAttrs> = () => {
  return {
    view: ({ attrs: { task, isInfoOpen, onToggle, onDelete, onOpenInfo, onCloseInfo } }) => {
      return m('div', { class: 'task' },
        m('div', { class: 'task-label' },
          m('input', {
            type: 'checkbox',
            checked: task.completed,
            id: `task-${task.id}`,
            onchange: onToggle,
          }),
          m('label', { for: `task-${task.id}` }, task.title),
        ),
        m('button', {
          class: 'open-task-info-btn',
          onclick: onOpenInfo,
          ariaLabel: 'See task info',
        }, '...'),
        isInfoOpen && m(TaskInfo, {
          task,
          onClose: onCloseInfo,
          onDelete: () => onDelete(task.id),
        }),
      )
    },
  }
}
