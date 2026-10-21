export interface TaskItem {
  id: string
  title: string
  completed: boolean
}

const STORAGE_KEY = 'todo-calendar.tasks'

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(TaskStore.tasks))
}

const tasks: TaskItem[] = []

const TaskStore = {
  tasks: tasks,
  add: function (title: string) {
    TaskStore.tasks.push({ id: 'todo-calendar', title, completed: false })
    save()
  },
}

export default TaskStore
