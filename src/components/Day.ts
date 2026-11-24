import m from 'mithril'
import TaskModel from '../models/TaskModel.js'
import { Task } from './Task.js'
import { TaskActions } from '../types/taskActions.js'
import { InfoPanel } from '../types/info.js'

interface DayAttrs {
  day: number
  startColumn?: number
  tasks: TaskModel[]
  actions: TaskActions
  info: InfoPanel
}

export const Day: m.ClosureComponent<DayAttrs> = () => {
  return {
    view: ({ attrs: { day, startColumn, tasks, actions, info } }) => {
      return m('div', {
        class: 'day',
        style: startColumn ? { gridColumnStart: startColumn } : undefined,
      },
      m('span', day),
      tasks.map((task) =>
        m(Task, {
          key: task.id,
          task,
          actions,
          info,
        }),
      ),
      )
    },
  }
}
