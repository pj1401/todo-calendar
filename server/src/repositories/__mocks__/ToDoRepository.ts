import type { IToDoRepository } from '../../lib/interfaces/index.js'

export const mockTodos = [
  { id: 1, userId: 'u1', title: 'Test 1', completed: 0 },
  { id: 2, userId: 'u1', title: 'Test 2', completed: 1 }
]

export class ToDoRepository implements IToDoRepository {
  get = jest.fn().mockResolvedValue(mockTodos)
  getById = jest.fn().mockResolvedValue(mockTodos[0])
  getOne = jest.fn().mockResolvedValue(mockTodos[0])
  insert = jest.fn().mockResolvedValue({ changes: 1, lastInsertRowid: 3 })
  update = jest.fn().mockResolvedValue({ changes: 1 })
  updateCompleted = jest.fn().mockResolvedValue({ changes: 1 })
  delete = jest.fn().mockResolvedValue({ changes: 1 })
}
