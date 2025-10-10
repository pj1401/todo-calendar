import { StartError } from './lib/errors/StartError.js'
import { logger } from './config/winston.js'
import Server from './Server.js'

/**
 * Represents the main application.
 */
export default class Application {
  #port: number

  /**
   * Creates a new instance of the application.
   *
   * @param {string} port - A string representing the port number.
   */
  constructor (port: unknown) {
    if (!this.#isString(port)) {
      throw new StartError('❌ Port not provided.')
    }
    this.#port = parseInt(String(port))
  }

  /**
   * Starts the server.
   */
  run () {
    try {
      const server = new Server(this.#port)
      server.startServer()
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message, { error: err })
      } else {
        logger.error(err)
      }
      process.exitCode = 1
    }
  }

  /**
   * Check if an unknown is a string.
   *
   * @param {unknown} testString - The string to check.
   * @returns {boolean} True if it is a string.
   */
  #isString (testString: unknown): boolean {
    return typeof testString !== 'undefined' && typeof testString === 'string'
  }
}
