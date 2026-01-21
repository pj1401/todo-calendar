import http from 'node:http'
import { ApplicationError } from './ApplicationError.js'

export class HttpError extends ApplicationError {
  status: number

  /**
   * Creates an instance of HttpError.
   *
   * @param {number} status - The HTTP status code.
   * @param {Error | unknown} cause - A value indicating the specific cause of the error.
   * @param {string} message - A human-readable description of the error.
   */
  constructor (status: number, cause?: Error | unknown, message?: string) {
    super(`${message || http.STATUS_CODES[status]}`, cause)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype)

    this.status = Number(status)
  }
}
