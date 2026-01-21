import { HttpError } from './errors/HttpError.js'

type ErrorStatus = Record<string, number>

const errorStatusMap: ErrorStatus = {
  InsufficientDataError: 400, // Bad Request
  ExcessDataError: 400, // Bad Request
  ValidationError: 400, // Bad Request
  InvalidCredentialsError: 401, // Unauthorized
  UnauthorizedError: 401, // Unauthorized
  ForbiddenError: 403, // Forbidden
  NotFoundError: 404, // Not Found
  ConcurrencyError: 409 // Conflict
}

/**
 * Converts the specified error to an HTTP error.
 *
 * @param {Error | unknown} error - The error to convert.
 * @returns {HttpError} The converted error.
 */
export function convertToHttpError (error: Error | unknown): HttpError {
  // Default to Internal Server Error.
  return new HttpError(error instanceof Error ? errorStatusMap[error.constructor.name] || 500 : 500, error)
}
