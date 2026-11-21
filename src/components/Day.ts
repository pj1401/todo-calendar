import m from 'mithril'
import TaskModel from '../models/TaskModel.js'

interface DayAttrs {
  day: number
  startColumn?: number
  task?: TaskModel
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
