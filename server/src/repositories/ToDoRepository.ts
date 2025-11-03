import db from '../config/db.js'
import { RepositoryError } from '../lib/errors/index.js'
import { ToDoRow } from '../lib/interfaces/index.js'

/**
 * Encapsulates a repository.
 */
export default class ToDoRepository {
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

  async insert (title: string, userId: string) {
    try {
      const statement = db.prepare('INSERT INTO todos (userId, title) VALUES (?, ?)')
      return await statement.run(userId, title)
    } catch (err) {
      throw new RepositoryError('Failed to create row.', err)
    }
  }

  async update (id: string, completed: number) {
    try {
      const statement = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
      return await statement.run(completed ? 1 : 0, id)
    } catch (err) {
      throw new RepositoryError('Failed to update row.', err)
    }
  }
}
