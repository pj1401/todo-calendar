import m from 'mithril'
import { TaskForm } from './TaskForm.js'
import { Calendar } from './Calendar.js'

export const ToDoCalendar: m.ClosureComponent = () => {
  return {
    view: () => {
      return m('div',
        m(TaskForm),
        m(Calendar),
      )
    },
  }
}
