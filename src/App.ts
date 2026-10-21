import m from 'mithril'
import './App.css'
import { Task } from './components/Task.js'

export const App = () => {
  return {
    view: () => {
      return m('div',
        m('h1', 'ToDo Calendar'),
        m(Task),
      )
    },
  }
}
