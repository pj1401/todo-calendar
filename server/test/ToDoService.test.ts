import ToDoService from '../src/services/ToDoService.js'

import { ToDoRepository } from '../src/repositories/__mocks__/ToDoRepository.js'
jest.mock('../src/repositories/ToDoRepository.js')

describe('ToDoService', () => {
  let repository: ToDoRepository
  let service: ToDoService

  beforeEach(() => {
    jest.clearAllMocks()
    repository = new ToDoRepository()
    // TODO: Create a repository base class and have ToDoService take that as an argument.
    service = new ToDoService(repository)
  })

  it('should convert completed from number to boolean', async () => {
    const result = await service.get('abc')

    expect(result).toEqual([
      { id: 1, userId: 'u1', title: 'Test 1', completed: false },
      { id: 2, userId: 'u1', title: 'Test 2', completed: true }
    ])
  })

  it('should call repository.get with correct userId', async () => {
    await service.get('u1')

    expect(repository.get).toHaveBeenCalledWith('u1')
  })
})
