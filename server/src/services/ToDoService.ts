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
      throw new Error('Failed to get documents.', err)
    }
  }
}
