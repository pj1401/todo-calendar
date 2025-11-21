import { ApplicationError } from './ApplicationError.js';
export class LoginError extends ApplicationError {
    constructor(message = 'Invalid login attempt.', cause) {
        super(message, cause);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, LoginError.prototype);
    }
}
