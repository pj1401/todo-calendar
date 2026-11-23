import m from 'mithril'
import TaskModel from '../models/TaskModel.js'
import { TaskInfo } from './TaskInfo.js'

export const Task: m.ClosureComponent<{ task: TaskModel, onToggle: () => void }> = () => {
  /**
   * Get the current task component.
   * @param {string} taskId The ID of the task.
   * @returns {HTMLElement} The current task component.
   */
  function getThisElement (taskId: string): HTMLElement {
    const element = document.getElementById(`task-comp-${taskId}`)
    if (!element) {
      throw new Error('Element not found')
    }
    return element
  }

  return {
    view: ({ attrs: { task, onToggle } }) => {
      return m('div', { class: 'task', id: `task-comp-${task.id}` },
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
          onclick: () => { m.render(getThisElement(task.id), m(TaskInfo, { task, onRemove: () => { /** */ } })) },
          ariaLabel: 'See task info',
        }, '...'),
      )
    },
  }
}
