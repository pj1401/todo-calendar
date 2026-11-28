import m from 'mithril'
import '../css/ToDoCalendar.css'
import { TaskForm } from './TaskForm.js'
import { Calendar } from './Calendar.js'
import { Task } from './Task.js'
import { TaskRepository } from '../models/TaskRepository.js'
import { Modal } from './Modal.js'
import Info from '../models/Info.js'
import TaskModel from '../models/TaskModel.js'

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
      this.#displayTaskForm(store.add),
      this.#displayCalendar(store),
      this.#displayUndatedTasks(store),
      this.#displayDeleteButton(),
      this.#displayDeleteModal(store.deleteAll),
    )
  }

  #displayTaskForm (add: TaskRepository['add']): m.Children {
    return m(TaskForm, { onAdd: (title: string, date: string) => add(title, date) })
  }

  #displayCalendar (store: TaskRepository) {
    return m(Calendar, {
      tasks: this.#filterDatedTasks(store.tasks),
      actions: store,
      info: this.#info,
    })
  }

  #filterDatedTasks (tasks: TaskModel[]) {
    return tasks.filter((task) => task.dateIsNotEmpty())
  }

  #displayUndatedTasks (store: TaskRepository) {
    return m('div', { class: 'undated-tasks' },
      this.#filterUndatedTasks(store.tasks).map((task) =>
        m(Task, {
          key: task.id,
          task,
          actions: store,
          info: this.#info,
        }),
      ),
    )
  }

  #filterUndatedTasks (tasks: TaskModel[]) {
    return tasks.filter((task) => !task.dateIsNotEmpty())
  }

  #displayDeleteButton () {
    return !this.#showDeleteModal && m('button', {
      onclick: () => { this.#showDeleteModal = true },
    }, 'Delete All')
  }

  #displayDeleteModal (deleteAll: TaskRepository['deleteAll']) {
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
