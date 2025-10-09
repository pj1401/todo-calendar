import { StartError } from './lib/errors/StartError.js'
import Server from './Server.js'

const NODEJS_EXPRESS_PORT = process.env.NODEJS_EXPRESS_PORT

try {
  if (!isString(NODEJS_EXPRESS_PORT)) {
    throw new StartError('❌ Port not provided.')
  }
  const port = parseInt(String(NODEJS_EXPRESS_PORT))
  const server = new Server(port)
  server.startServer()
} catch (err) {
  console.error(err)
}

/**
 * Check if an unknown is a string.
 *
 * @param {unknown} testString - The string to check.
 * @returns {boolean} True if it is a string.
 */
function isString (testString: unknown): boolean {
  return typeof testString !== 'undefined' && typeof testString === 'string'
}
