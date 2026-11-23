import m from 'mithril'
import TaskModel from '../models/TaskModel.js'

export const Task: m.ClosureComponent<{ task: TaskModel, onToggle: () => void }> = () => {
  return {
    view: ({ attrs: { task, onToggle } }) => {
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
          onclick: () => { /** Open task info */ },
          ariaLabel: 'See task info',
        }, '...'),
      )
    },
  }
}
