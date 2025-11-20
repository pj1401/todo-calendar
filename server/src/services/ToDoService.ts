import type { RunResult } from 'better-sqlite3'
import { ApplicationError } from '../lib/errors/index.js'
import type { IToDoRepository, ToDo, ToDoRow } from '../lib/interfaces/index.js'

/**
 * Encapsulates a service.
 */
export default class ToDoService {
  #repository: IToDoRepository

  constructor (repository: IToDoRepository) {
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

  /**
   * Get a todo by id.
   * @param {number} id - The id of the todo.
   * @returns {Promise<ToDo>} The requested todo.
   */
  async getById (id: number): Promise<ToDo> {
    try {
      const todo = await this.#repository.getById(id)
      return {
        ...todo,
        completed: Boolean(todo.completed)
      }
    } catch (err) {
      throw new ApplicationError('Failed to get todo.', err)
    }
  }

  /**
   * Get one todo.
   * @param {number} id - The id of the todo.
   * @param {string} userId - The userId.
   * @returns {Promise<ToDo>} The requested todo.
   */
  async getOne (id: number, userId: string): Promise<ToDo> {
    try {
      const todo = await this.#repository.getOne(id, userId)
      return {
        ...todo,
        completed: Boolean(todo.completed)
      }
    } catch (err) {
      throw new ApplicationError('Failed to get todo.', err)
    }
  }

  /**
   * Insert a new todo.
   * @param {string} title - The title of the todo.
   * @param {string} userId - The userId.
   * @returns {Promise<RunResult>} An info object.
   */
  async insert (title: string, userId: string): Promise<RunResult> {
    try {
      return await this.#repository.insert(title, userId)
    } catch (err) {
      throw new ApplicationError('Failed to insert todo.', err)
    }
  }

  /**
   * Update the todo title.
   * @param {number} id - The id of the todo.
   * @param {string} userId - The userId.
   * @param {string} title - The new title.
   * @returns {Promise<RunResult>} An info object.
   */
  async update (id: number, userId: string, title: string): Promise<RunResult> {
    try {
      return await this.#repository.update(id, userId, title)
    } catch (err) {
      throw new ApplicationError('Failed to update todo.', err)
    }
  }

  /**
   * Update the completed property.
   * @param {number} id - The id of the todo.
   * @param {string} userId - The userId.
   * @param {number} completed - The new value of the completed property.
   * @returns {Promise<RunResult>} An info object.
   */
  async updateCompleted (id: string, userId: string, completed: number): Promise<RunResult> {
    try {
      return await this.#repository.updateCompleted(id, userId, completed)
    } catch (err) {
      throw new ApplicationError('Failed to update todo.', err)
    }
  }
}
