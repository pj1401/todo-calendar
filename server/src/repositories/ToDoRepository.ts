import type { RunResult } from 'better-sqlite3'
import db from '../config/db.js'
import { RepositoryError } from '../lib/errors/index.js'
import { ToDoRow } from '../lib/interfaces/index.js'

/**
 * Encapsulates a repository.
 */
export default class ToDoRepository {
  // TODO: Pass db object in constructor.

  /**
   * Get todos.
   * @param {string} userId - The userId as a string.
   * @returns {Promise<ToDoRow[]>} The requested rows.
   */
  async get (userId: string): Promise<ToDoRow[]> {
    try {
      return await db.prepare('SELECT * FROM todos WHERE userId = ?').all(userId) as ToDoRow[]
    } catch (err) {
      throw new RepositoryError('Failed to get rows.', err)
    }
  }

  /**
   * Get a single row by id.
   * @param {number} id - The id of the todo.
   * @returns {Promise<ToDoRow>} The requested row.
   */
  async getById (id: number): Promise<ToDoRow> {
    try {
      return await db.prepare('SELECT * FROM todos WHERE id = ? LIMIT 1').get(id) as ToDoRow
    } catch (err) {
      throw new RepositoryError('Failed to get row.', err)
    }
  }

  /**
   * Get a single row.
   * @param {number} id - The id of the todo.
   * @param {string} userId - The userId.
   * @returns {Promise<ToDoRow>} The requested row.
   */
  async getOne (id: number, userId: string): Promise<ToDoRow> {
    try {
      return await db.prepare('SELECT * FROM todos WHERE id = ? AND userId = ? LIMIT 1').get(id, userId) as ToDoRow
    } catch (err) {
      throw new RepositoryError('Failed to get row.', err)
    }
  }

  /**
   * Insert a new row.
   * @param {string} title - The title of the todo.
   * @param {string} userId - The userId.
   * @returns {Promise<RunResult>} An info object.
   */
  async insert (title: string, userId: string): Promise<RunResult> {
    try {
      const statement = db.prepare('INSERT INTO todos (userId, title) VALUES (?, ?)')
      return await statement.run(userId, title)
    } catch (err) {
      throw new RepositoryError('Failed to create row.', err)
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
      const statement = db.prepare('UPDATE todos SET title = ? WHERE id = ? AND userId = ?')
      return await statement.run(title, id, userId)
    } catch (err) {
      throw new RepositoryError('Failed to update row.', err)
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
      const statement = db.prepare('UPDATE todos SET completed = ? WHERE id = ? AND userId = ?')
      return await statement.run(completed ? 1 : 0, id, userId)
    } catch (err) {
      throw new RepositoryError('Failed to update row.', err)
    }
  }
}
