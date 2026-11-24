import m from 'mithril'
import './App.css'
import TaskStore from './db/TaskStore.js'
import { ToDoCalendar } from './components/ToDoCalendar.js'

export const App = () => {
  return {
    view: () => {
      return m('div',
        m('h1', 'ToDo Calendar'),
        m(ToDoCalendar, { store: TaskStore }),
      )
    },
  }
}
