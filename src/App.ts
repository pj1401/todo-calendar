import m from 'mithril'
import './App.css'
import { Task } from './components/Task.js'
import { TaskForm } from './components/TaskForm.js'
import TaskStore from './models/TaskStore.js'
import TaskModel from './models/TaskModel.js'

export const App = () => {
  return {
    view: () => {
      return m('div',
        m('h1', 'ToDo Calendar'),
        m(TaskForm),
        TaskStore.tasks.map((task: TaskModel) => m(Task, { key: task.id, task })),
      )
    },
  }
}
