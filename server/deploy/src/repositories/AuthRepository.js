import { auth } from '../utils/auth.js';
import { LoginError } from '../lib/errors/LoginError.js';
/**
 * Encapsulates a repository.
 */
export default class AuthRepository {
    async login(username, password) {
        try {
            return await auth.api.signInUsername({
                body: {
                    username: username,
                    password: password
                },
                asResponse: true
            });
        }
        catch (err) {
            throw new LoginError('Invalid login attempt.', err);
        }
    }
}
