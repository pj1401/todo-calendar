import { ApplicationError } from './ApplicationError.js'

export class ForbiddenError extends ApplicationError {
  constructor (message = 'The server understood the request, but refused to authorize it due to the provided credentials lacking permission for the requested resource.', cause?: Error | unknown) {
    super(message, cause)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }
}
