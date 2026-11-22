import m from 'mithril'
import TaskModel from '../models/TaskModel.js'
import { TaskRepository } from '../models/TaskRepository.js'

interface DayAttrs {
  day: number
  startColumn?: number
  tasks: TaskModel[]
  onToggle: TaskRepository['toggle']
}

export const Day: m.ClosureComponent<DayAttrs> = () => {
  return {
    view: ({ attrs: { day, startColumn } }) => {
      return m('div', {
        class: 'day',
        style: startColumn ? { gridColumnStart: startColumn } : undefined,
      },
      m('span', day),
      )
    },
  }
}
