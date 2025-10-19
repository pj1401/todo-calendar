import { ApplicationError } from './ApplicationError.js'

export class SignOutError extends ApplicationError {
  constructor (message = 'There was a problem signing out.', cause?: Error | unknown) {
    super(message, cause)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, SignOutError.prototype)
  }
}
