// User-land modules.
import express from 'express'

import { logger } from './config/winston.js'
import { ServerError } from './lib/errors/ServerError.js'
import MainRouter from './routes/MainRouter.js'

/**
 * Represents an Express server.
 */
export default class Server {
  #app
  #port: number

  /**
   * Initialises a new instance.
   *
   * @param {number} port - The port number to listen on.
   */
  constructor (port: number) {
    if (!this.#isValidPort(port)) {
      throw new ServerError('❌ Could not parse port number.')
    }
    this.#app = express()
    this.#port = port
    this.#registerRoutes()
  }

  #isValidPort (port: unknown) {
    return typeof port === 'number' && !Number.isNaN(port)
  }

  #registerRoutes () {
    const mainRouter = new MainRouter()
    this.#app.use('/', mainRouter.router)
  }

  /**
   * Start the server.
   */
  startServer () {
    try {
      const server = this.#app.listen(this.#port, () => {
        const address = server.address()
        if (typeof address === 'object' && address !== null) {
          logger.info(`Server running at http://localhost:${address.port}`)
        }
        logger.info('Press Ctrl-C to terminate...')
      })
    } catch (err) {
      logger.error(err)
      process.exitCode = 1
    }
  }
}
