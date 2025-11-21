import type { RunResult } from 'better-sqlite3'
import type { ToDoRow } from './index.js'

export interface IToDoRepository {
  get(userId: string): Promise<ToDoRow[]>
  getById(id: number): Promise<ToDoRow>
  getOne(id: number, userId: string): Promise<ToDoRow>
  insert(title: string, userId: string): Promise<RunResult>
  update(id: number, userId: string, title: string): Promise<RunResult>
  updateCompleted(id: string, userId: string, completed: number): Promise<RunResult>
  delete(id: number, userId: string): Promise<RunResult>
}
