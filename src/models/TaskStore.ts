import TaskModel, { TaskItem } from './TaskModel.js'
import { TaskRepository } from './TaskRepository.js'

// Tasks saved before the date attribute existed have no date field.
type StoredTask = Omit<TaskItem, 'date'> & { date?: string }
const STORAGE_KEY = 'todo-calendar.tasks'

const load = (): TaskModel[] => {
  try {
    const stored: StoredTask[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return stored.map(({ id, title, completed, date }) => new TaskModel(id, title, completed, date ?? ''))
  } catch {
    return []
  }
}

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(TaskStore.tasks))
}

const removeStored = () => {
  localStorage.removeItem(STORAGE_KEY)
}

const findTask = (id: string) => {
  return TaskStore.tasks.find((task: TaskItem) => task.id === id)
}

const findTaskIndex = (id: string) => {
  return TaskStore.tasks.findIndex((task: TaskItem) => task.id === id)
}

const TaskStore: TaskRepository = {
  tasks: load(),
  add: function (title: string, date: string) {
    TaskStore.tasks.push(new TaskModel(crypto.randomUUID(), title, false, date))
    save()
  },
  toggle: function (id: string) {
    const task = findTask(id)
    if (task) {
      task.completed = !task.completed
      save()
    }
  },
  delete: function (id: string) {
    const taskIndex = findTaskIndex(id)
    if (taskIndex !== -1) {
      TaskStore.tasks.splice(taskIndex, 1)
      save()
    }
  },
  deleteAll: function () {
    removeStored()
  },
}

export default TaskStore
