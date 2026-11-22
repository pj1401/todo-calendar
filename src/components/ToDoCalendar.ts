import m from 'mithril'
import { TaskForm } from './TaskForm.js'
import { Calendar } from './Calendar.js'
import { Task } from './Task.js'
import { TaskRepository } from '../models/TaskRepository.js'

interface ToDoCalendarAttrs {
  store: TaskRepository
}

export const ToDoCalendar: m.ClosureComponent<ToDoCalendarAttrs> = () => {
  return {
    view: ({ attrs: { store } }) => {
      const datedTasks = store.tasks.filter((task) => task.dateIsNotEmpty())

      return m('div',
        m(TaskForm, { onAdd: (title: string, date: string) => store.add(title, date) }),
        m(Calendar, { tasks: datedTasks, onToggle: (id: string) => store.toggle(id) }),
        store.tasks.map((task) =>
          m(Task, { key: task.id, task, onToggle: () => store.toggle(task.id) }),
        ),
      )
    },
  }
}
