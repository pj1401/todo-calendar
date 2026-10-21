import m from 'mithril'
import './App.css'
import { Task } from './components/Task.js'
import { TaskForm } from './components/TaskForm.js'

export const App = () => {
  return {
    view: () => {
      return m('div',
        m('h1', 'ToDo Calendar'),
        m(TaskForm),
        m(Task),
      )
    },
  }
}
