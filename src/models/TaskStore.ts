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
    TaskStore.tasks.push({ id: 'todo-calendar', title, completed: false })
    save()
  },
}

export default TaskStore
