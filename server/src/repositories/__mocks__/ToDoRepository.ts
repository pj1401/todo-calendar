export const mockTodos = [
  { id: 1, userId: 'u1', title: 'Test 1', completed: 0 },
  { id: 2, userId: 'u1', title: 'Test 2', completed: 1 }
]

export class ToDoRepository {
  get = jest.fn().mockResolvedValue(mockTodos)
  insert = jest.fn().mockResolvedValue({ id: 3, userId: 'u1', title: 'New Todo', completed: 0 })
  update = jest.fn().mockResolvedValue({ changes: 1 })
  updateCompleted = jest.fn().mockResolvedValue({ changes: 1 })
  delete = jest.fn().mockResolvedValue({ changes: 1 })
}
