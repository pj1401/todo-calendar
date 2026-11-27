import m from 'mithril'
import '../css/ToDoCalendar.css'
import { TaskForm } from './TaskForm.js'
import { Calendar } from './Calendar.js'
import { Task } from './Task.js'
import { TaskRepository } from '../models/TaskRepository.js'
import { Modal } from './Modal.js'
import Info from '../models/Info.js'

interface ToDoCalendarAttrs {
  store: TaskRepository
}

// export const ToDoCalendar: m.ClosureComponent<ToDoCalendarAttrs> = () => {
//   let showDeleteModal = false

//   const info: InfoPanel = {
//     openTaskId: null,
//     open: (taskId) => { info.openTaskId = taskId },
//     close: () => { info.openTaskId = null },
//   }

//   return {
//     view: ({ attrs: { store } }) => {
//       const datedTasks = store.tasks.filter((task) => task.dateIsNotEmpty())
//       const undatedTasks = store.tasks.filter((task) => !task.dateIsNotEmpty())

//       return m('div', { class: 'todo-calendar' },
//         m(TaskForm, { onAdd: (title: string, date: string) => store.add(title, date) }),
//         m(Calendar, {
//           tasks: datedTasks,
//           actions: store,
//           info,
//         }),
//         m('div', { class: 'undated-tasks' },
//           undatedTasks.map((task) =>
//             m(Task, {
//               key: task.id,
//               task,
//               actions: store,
//               info,
//             }),
//           ),
//         ),
//         !showDeleteModal && m('button', {
//           onclick: () => { showDeleteModal = true },
//         }, 'Delete All'),
//         showDeleteModal && m(Modal, {
//           message: 'Delete all tasks?',
//           confirmBtnText: 'Delete All',
//           onConfirm: () => {
//             store.deleteAll()
//             showDeleteModal = false
//           },
//           onCancel: () => { showDeleteModal = false },
//         }),
//       )
//     },
//   }
// }

export class ToDoCalendar {
  #store: TaskRepository
  #showDeleteModal = false
  #info: Info
  constructor (attrs: ToDoCalendarAttrs) {
    this.#store = attrs.store
    this.#info = new Info()
  }

  view () {
    const datedTasks = this.#store.tasks.filter((task) => task.dateIsNotEmpty())
    const undatedTasks = this.#store.tasks.filter((task) => !task.dateIsNotEmpty())

    return m('div', { class: 'todo-calendar' },
      m(TaskForm, { onAdd: (title: string, date: string) => this.#store.add(title, date) }),
      m(Calendar, {
        tasks: datedTasks,
        actions: this.#store,
        info: this.#info,
      }),
      m('div', { class: 'undated-tasks' },
        undatedTasks.map((task) =>
          m(Task, {
            key: task.id,
            task,
            actions: this.#store,
            info: this.#info,
          }),
        ),
      ),
      !this.#showDeleteModal && m('button', {
        onclick: () => { this.#showDeleteModal = true },
      }, 'Delete All'),
      this.#showDeleteModal && m(Modal, {
        message: 'Delete all tasks?',
        confirmBtnText: 'Delete All',
        onConfirm: () => {
          this.#store.deleteAll()
          this.#showDeleteModal = false
        },
        onCancel: () => { this.#showDeleteModal = false },
      }),
    )
  }
}
