import { LoginError } from '../lib/errors/LoginError.js'

/**
 * Encapsulates a repository.
 */
export default class AuthRepository {
  async login (username, password) {
    try {
      // ...
    } catch (err) {
      throw new LoginError('Invalid login attempt.', err)
    }
  }
}
