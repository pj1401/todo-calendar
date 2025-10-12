import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import expressLayouts from 'express-ejs-layouts'

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
    this.#setupViewEngine()
    this.#registerRoutes()
  }

  #isValidPort (port: unknown) {
    return typeof port === 'number' && !Number.isNaN(port)
  }

  #setupViewEngine () {
    const directoryFullName = dirname(fileURLToPath(import.meta.url))
    this.#app.set('view engine', 'ejs')
    this.#app.set('views', join(directoryFullName, 'views'))
    this.#app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
    this.#app.set('layout extractScripts', true)
    this.#app.set('layout extractStyles', true)
    this.#app.use(expressLayouts)
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
