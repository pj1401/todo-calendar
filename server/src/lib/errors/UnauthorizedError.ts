import { ApplicationError } from './ApplicationError.js'

export class UnauthorizedError extends ApplicationError {
  constructor (message = 'Missing or invalid authentication credentials.', cause?: Error | unknown) {
    super(message, cause)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}
