import { ApplicationError } from './ApplicationError.js';
export class SignUpError extends ApplicationError {
    constructor(message = 'There was a problem creating the account.', cause) {
        super(message, cause);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SignUpError.prototype);
    }
}
