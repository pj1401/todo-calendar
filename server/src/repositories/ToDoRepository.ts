import db from '../config/db.js'
import { RepositoryError } from '../lib/errors/index.js'

/**
 * Encapsulates a repository.
 */
export default class ToDoRepository {
  async get (userId: string) {
    try {
      return await db.prepare('SELECT * FROM todos WHERE userId = ?').all(userId)
    } catch (err) {
      throw new RepositoryError('Failed to get documents.', err)
    }
  }
}
