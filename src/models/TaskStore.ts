import TaskModel, { TaskItem } from './TaskModel.js'

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

const TaskStore = {
  tasks: load(),
  add: function (title: string, date: string) {
    TaskStore.tasks.push(new TaskModel(crypto.randomUUID(), title, false, date))
    save()
  },
  toggle: function (id: string) {
    const task = TaskStore.tasks.find((task: TaskItem) => task.id === id)
    if (task) {
      task.completed = !task.completed
      save()
    }
  },
}

export default TaskStore
