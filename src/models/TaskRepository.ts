import TaskModel from './TaskModel.js'

export interface TaskRepository {
  readonly tasks: TaskModel[]
  // Use Promise<void> to enable async storage.
  add(title: string, date: string): void | Promise<void>
  toggle(id: string): void | Promise<void>
  delete(id: string): void | Promise<void>
  deleteAll(): void | Promise<void>
}
