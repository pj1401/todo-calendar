import { ApplicationError } from './ApplicationError.js'

export class NotFoundError extends ApplicationError {
  constructor (message = 'Could not find the requested resource.', cause?: Error | unknown) {
    super(message, cause)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}
