import { LoginError } from '../lib/errors/LoginError.js';
import AuthRepository from '../repositories/AuthRepository.js';
/**
 * Encapsulates a service.
 */
export default class AuthService {
    #repository;
    constructor(repository = new AuthRepository()) {
        this.#repository = repository;
    }
    async login(username, password) {
        try {
            return this.#repository.login(username, password);
        }
        catch (err) {
            throw new LoginError('Invalid login attempt.', err);
        }
    }
}
