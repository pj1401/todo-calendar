/**
 * Represents an ApplicationError, a custom error.
 */
export class ApplicationError extends Error {
    /**
     * Creates an instance of ApplicationError.
     *
     * @param {string} message - A human-readable description of the error.
     * @param {Error | unknown} cause - A value indicating the specific cause of the error.
     */
    constructor(message, cause) {
        super(message);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApplicationError.prototype);
        // Help to identify this error.
        this.name = this.constructor.name;
        // Additional data about the error.
        this.cause = cause;
    }
}
