import m from 'mithril'
import { TaskForm } from './TaskForm.js'
import { Calendar } from './Calendar.js'
import { TaskRepository } from '../models/TaskRepository.js'

interface ToDoCalendarAttrs {
  store: TaskRepository
}

export const ToDoCalendar: m.ClosureComponent<ToDoCalendarAttrs> = () => {
  return {
    view: ({ attrs: { store } }) => {
      return m('div',
        m(TaskForm, { onAdd: (title: string, date: string) => store.add(title, date) }),
        m(Calendar)
      )
    },
  }
}
