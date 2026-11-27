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

export class ToDoCalendar implements m.ClassComponent<ToDoCalendarAttrs> {
  #showDeleteModal = false
  #info = new Info()

  view ({ attrs: { store } }: m.CVnode<ToDoCalendarAttrs>): m.Children {
    const datedTasks = store.tasks.filter((task) => task.dateIsNotEmpty())
    const undatedTasks = store.tasks.filter((task) => !task.dateIsNotEmpty())

    return m('div', { class: 'todo-calendar' },
      m(TaskForm, { onAdd: (title: string, date: string) => store.add(title, date) }),
      m(Calendar, {
        tasks: datedTasks,
        actions: store,
        info: this.#info,
      }),
      m('div', { class: 'undated-tasks' },
        undatedTasks.map((task) =>
          m(Task, {
            key: task.id,
            task,
            actions: store,
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
          store.deleteAll()
          this.#showDeleteModal = false
        },
        onCancel: () => { this.#showDeleteModal = false },
      }),
    )
  }
}
