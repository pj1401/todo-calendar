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

  /**
   * Called when the component is rendered.
   * @param {m.CVnode<ToDoCalendarAttrs>} vnode input vnode.
   * @returns {m.Children} Child vnodes.
   */
  view ({ attrs: { store } }: m.CVnode<ToDoCalendarAttrs>): m.Children {
    return m('div', { class: 'todo-calendar' },
      this.#displayTaskForm(store),
      this.#displayCalendar(store),
      this.#displayUndatedTasks(store),
      this.#displayDeleteButton(),
      this.#displayDeleteModal(store.deleteAll),
    )
  }

  #displayTaskForm (store: TaskRepository): m.Children {
    return m(TaskForm, { onAdd: (title: string, date: string) => store.add(title, date) })
  }

  #displayCalendar (store: TaskRepository) {
    const datedTasks = store.tasks.filter((task) => task.dateIsNotEmpty())
    return m(Calendar, {
      tasks: datedTasks,
      actions: store,
      info: this.#info,
    })
  }

  #displayUndatedTasks (store: TaskRepository) {
    const undatedTasks = store.tasks.filter((task) => !task.dateIsNotEmpty())
    return m('div', { class: 'undated-tasks' },
      undatedTasks.map((task) =>
        m(Task, {
          key: task.id,
          task,
          actions: store,
          info: this.#info,
        }),
      ),
    )
  }

  #displayDeleteButton () {
    return !this.#showDeleteModal && m('button', {
      onclick: () => { this.#showDeleteModal = true },
    }, 'Delete All')
  }

  #displayDeleteModal (deleteAll: () => void | Promise<void>) {
    return this.#showDeleteModal && m(Modal, {
      message: 'Delete all tasks?',
      confirmBtnText: 'Delete All',
      onConfirm: () => {
        deleteAll()
        this.#showDeleteModal = false
      },
      onCancel: () => { this.#showDeleteModal = false },
    })
  }
}
