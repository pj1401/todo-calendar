import { ApplicationError } from '../lib/errors/index.js'
import ToDoRepository from '../repositories/ToDoRepository.js'

/**
 * Encapsulates a service.
 */
export default class ToDoService {
  #repository: ToDoRepository

  constructor (repository: ToDoRepository = new ToDoRepository()) {
    this.#repository = repository
  }

  async get (userId: string) {
    try {
      return await this.#repository.get(userId)
    } catch (err) {
      throw new ApplicationError('Failed to get documents.', err)
    }
  }

  async insert (title: string, userId: string) {
    try {
      return await this.#repository.insert(title, userId)
    } catch (err) {
      throw new ApplicationError('Failed to insert documents.', err)
    }
  }
}
