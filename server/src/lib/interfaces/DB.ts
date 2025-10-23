export interface DB {
  user: UserRow
  todos: ToDoRow
}

interface UserRow {
  id: string
  createdAt: string
  updatedAt: string
  email: string
  emailVerified: number
  name: string
  image?: string | null | undefined
  username?: string | null | undefined
  displayUsername?: string | null | undefined
}

export interface ToDoRow {
  id: number
  userId: string
  title: string
  completed: number
}
