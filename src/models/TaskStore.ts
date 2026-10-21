export interface TaskItem {
  id: string
  title: string
  completed: boolean
}

const STORAGE_KEY = 'todo-calendar.tasks'

const load = (): TaskItem[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(TaskStore.tasks))
}

const TaskStore = {
  tasks: load(),
  add: function (title: string) {
    TaskStore.tasks.push({ id: crypto.randomUUID(), title, completed: false })
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
