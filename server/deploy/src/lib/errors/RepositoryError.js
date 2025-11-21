import { ApplicationError } from './ApplicationError.js';
export class RepositoryError extends ApplicationError {
    constructor(message = 'An error occurred while accessing the repository', cause) {
        super(message, cause);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RepositoryError.prototype);
    }
}
