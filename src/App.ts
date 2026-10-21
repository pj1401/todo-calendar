import m from 'mithril'
import './App.css'
import { Task } from './components/Task.js'
import { TaskForm } from './components/TaskForm.js'
import TaskStore, { TaskItem } from './models/TaskStore.js'

export const App = () => {
  return {
    view: () => {
      return m('div',
        m('h1', 'ToDo Calendar'),
        m(TaskForm),
        TaskStore.tasks.map((task: TaskItem) => m(Task, { key: task.id, task })),
      )
    },
  }
}
