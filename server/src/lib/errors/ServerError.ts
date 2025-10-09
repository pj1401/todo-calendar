import { ApplicationError } from './ApplicationError.js'

export class ServerError extends ApplicationError {
  constructor (message: string, cause?: Error | unknown) {
    super(message, cause)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ServerError.prototype)
  }
}
