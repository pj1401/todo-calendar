import m from 'mithril'
import './App.css'
import { Task } from './components/Task.js'
import TaskStore from './models/TaskStore.js'
import TaskModel from './models/TaskModel.js'
import { ToDoCalendar } from './components/ToDoCalendar'

export const App = () => {
  return {
    view: () => {
      return m('div',
        m('h1', 'ToDo Calendar'),
        m(ToDoCalendar, { store: TaskStore }),
        TaskStore.tasks.map((task: TaskModel) => m(Task, { key: task.id, task })),
      )
    },
  }
}
