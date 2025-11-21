import { ApplicationError } from './ApplicationError.js';
export class StartError extends ApplicationError {
    constructor(message, cause) {
        super(message, cause);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, StartError.prototype);
    }
}
