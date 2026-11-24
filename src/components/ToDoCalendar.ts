import m from 'mithril'
import { TaskForm } from './TaskForm.js'
import { Calendar } from './Calendar.js'
import { Task } from './Task.js'
import { TaskRepository } from '../models/TaskRepository.js'
import { Modal } from './Modal.js'

interface ToDoCalendarAttrs {
  store: TaskRepository
}

export const ToDoCalendar: m.ClosureComponent<ToDoCalendarAttrs> = () => {
  let showDeleteModal = false
  let openInfoTaskId: string | null = null
  const onOpenInfo = (taskId: string) => {
    openInfoTaskId = taskId
  }

  const onCloseInfo = () => {
    openInfoTaskId = null
  }

  return {
    view: ({ attrs: { store } }) => {
      const datedTasks = store.tasks.filter((task) => task.dateIsNotEmpty())
      const undatedTasks = store.tasks.filter((task) => !task.dateIsNotEmpty())

      return m('div',
        m(TaskForm, { onAdd: (title: string, date: string) => store.add(title, date) }),
        m(Calendar, {
          tasks: datedTasks,
          onToggle: (id: string) => store.toggle(id),
          onDelete: (id: string) => store.delete(id),
          openInfoTaskId,
          onOpenInfo,
          onCloseInfo,
        }),
        undatedTasks.map((task) =>
          m(Task, {
            key: task.id,
            isInfoOpen: openInfoTaskId === task.id,
            task, onToggle: () => store.toggle(task.id),
            onDelete: (id: string) => store.delete(id),
            onOpenInfo: () => onOpenInfo(task.id),
            onCloseInfo,
          }),
        ),
        m('button', { onclick: () => showDeleteModal = true }, 'Delete All'),
        showDeleteModal && m(Modal, {
          message: 'Delete all tasks?',
          confirmBtnText: 'Delete All',
          onConfirm: () => {
            store.deleteAll()
            showDeleteModal = false
          },
          onCancel: () => showDeleteModal = false,
        }),
      )
    },
  }
}
