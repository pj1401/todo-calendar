import { ApplicationError } from '../lib/errors/index.js'
import { ToDo, ToDoRow } from '../lib/interfaces/index.js'
import ToDoRepository from '../repositories/ToDoRepository.js'

/**
 * Encapsulates a service.
 */
export default class ToDoService {
  #repository: ToDoRepository

  constructor (repository: ToDoRepository = new ToDoRepository()) {
    this.#repository = repository
  }

  /**
   * Get all todos owned by a user.
   * @param {string} userId - The userId.
   * @returns {Promise<ToDo[]>} A Promise that resolves to an array of Todos.
   */
  async get (userId: string): Promise<ToDo[]> {
    try {
      const todos = await this.#repository.get(userId)
      return todos.map((todo: ToDoRow) => ({
        ...todo,
        completed: Boolean(todo.completed)
      }))
    } catch (err) {
      throw new ApplicationError('Failed to get todos.', err)
    }
  }

  async insert (title: string, userId: string) {
    try {
      return await this.#repository.insert(title, userId)
    } catch (err) {
      throw new ApplicationError('Failed to insert todo.', err)
    }
  }

  async updateCompleted (id: string, completed: number) {
    try {
      return await this.#repository.update(id, completed)
    } catch (err) {
      throw new ApplicationError('Failed to update todo.', err)
    }
  }
}
