import db from '../config/db.js'

/**
 * Encapsulates a repository.
 */
export default class ToDoRepository {
  async get (userId: string) {
    try {
      return await db.prepare('SELECT * FROM todos WHERE userId = ?').all(userId)
    } catch (err) {
      throw new Error('Failed to get documents.', err)
    }
  }
}
