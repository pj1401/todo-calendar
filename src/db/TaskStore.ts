import TaskModel, { TaskData } from '../models/TaskModel.js'
import { TaskRepository } from '../models/TaskRepository.js'

// Tasks saved before the date attribute existed have no date field.
type StoredTask = Omit<TaskData, 'date'> & { date?: string }
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

const findTask = (id: string) => {
  return TaskStore.tasks.find((task: TaskData) => task.id === id)
}

const findTaskIndex = (id: string) => {
  return TaskStore.tasks.findIndex((task: TaskData) => task.id === id)
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
      task.toggle()
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
    TaskStore.tasks.length = 0
    save()
  },
}

export default TaskStore
