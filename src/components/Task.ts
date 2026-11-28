import m from 'mithril'
import TaskModel from '../models/TaskModel.js'
import { TaskInfo } from './TaskInfo.js'
import { InfoPanel } from '../models/Info.js'
import { TaskActions } from '../types/taskActions.js'

interface TaskAttrs {
  task: TaskModel
  actions: TaskActions
  info: InfoPanel
}

export const Task: m.ClosureComponent<TaskAttrs> = () => {
  return {
    view: ({ attrs: { task, actions, info } }) => {
      const isInfoOpen = info.isInfoOpen(task.getId())
      return m('div', { class: 'task' },
        m('div', { class: 'task-label' },
          m('input', {
            type: 'checkbox',
            checked: task.completed,
            id: `task-${task.getId()}`,
            onchange: () => actions.toggle(task.getId()),
          }),
          m('label', { for: `task-${task.getId()}` }, task.getTitle()),
        ),
        m('button', {
          class: 'open-task-info-btn',
          onclick: () => info.open(task.getId()),
          ariaLabel: 'See ToDo info',
        }, '...'),
        isInfoOpen && m(TaskInfo, {
          task,
          onClose: () => info.close(),
          onDelete: () => actions.delete(task.getId()),
        }),
      )
    },
  }
}
