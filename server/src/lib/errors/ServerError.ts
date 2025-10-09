export class ServerError extends Error {
  constructor (message: string, cause?: Error | unknown) {
    super(message)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ServerError.prototype)

    // Help to identify this error.
    this.name = this.constructor.name

    // Additional data about the error.
    this.cause = cause
  }
}
