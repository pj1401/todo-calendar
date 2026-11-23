import m from 'mithril'
import TaskModel from '../models/TaskModel.js'
import { TaskRepository } from '../models/TaskRepository.js'
import { Task } from './Task.js'

interface DayAttrs {
  day: number
  startColumn?: number
  tasks: TaskModel[]
  onToggle: TaskRepository['toggle']
  openInfoTaskId: string | null
}

export const Day: m.ClosureComponent<DayAttrs> = () => {
  return {
    view: ({ attrs: { day, startColumn, tasks, onToggle, openInfoTaskId } }) => {
      return m('div', {
        class: 'day',
        style: startColumn ? { gridColumnStart: startColumn } : undefined,
      },
      m('span', day),
      tasks.map((task) =>
        m(Task, {
          key: task.id,
          isInfoOpen: openInfoTaskId === task.id,
          task,
          onToggle: () => onToggle(task.id),
          onOpenInfo: () => { openInfoTaskId = task.id },
          onCloseInfo: () => { openInfoTaskId = null },
        }),
      ),
      )
    },
  }
}
