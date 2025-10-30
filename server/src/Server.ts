// Must be first!
import httpContext from 'express-http-context'

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import type { Server as nodeHttpServer } from 'node:http'

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import morgan from 'morgan'

import { logger } from './config/winston.js'
import { ServerError } from './lib/errors/ServerError.js'
import MainRouter from './routes/MainRouter.js'
import { User } from './lib/interfaces/index.js'

// Express request object.
declare module 'express-serve-static-core' {
  interface Request {
    requestUuid: string
    userDoc: User | undefined
  }
}

/**
 * Represents an Express server.
 */
export default class Server {
  #app
  #port: number
  #baseURL
  #httpServer!: nodeHttpServer
  #directoryFullName

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

    // Set the base URL to use for all relative URLs in a document.
    this.#baseURL = process.env.BASE_URL || '/'

    // Get the directory name of this module's path.
    this.#directoryFullName = dirname(fileURLToPath(import.meta.url))
  }

  /**
   * Get the HTTP server object and start listening for connections.
   * @returns {nodeHttpServer} The server object.
   */
  #getServer (): nodeHttpServer {
    return this.#app.listen(this.#port, () => {
      const address = this.#httpServer.address()
      if (typeof address === 'object' && address !== null) {
        logger.info(`Server running at http://localhost:${address.port}`)
      }
      logger.info('Press Ctrl-C to terminate...')
    })
  }

  #isValidPort (port: unknown) {
    return typeof port === 'number' && !Number.isNaN(port)
  }

  /**
   * Start the server.
   */
  startServer () {
    try {
      this.#parseRequests()
      this.#setupViewEngine()
      this.#addRequestBody()
      this.#serveStaticFiles()
      this.#addContext()
      this.#setupMorganLogger()
      this.#setupMiddleware()
      this.#registerRoutes()
      this.#httpServer = this.#getServer()
    } catch (err) {
      logger.error(err)
      process.exitCode = 1
    }
  }

  /**
   * Parse requests of the content type application/json.
   */
  #parseRequests () {
    this.#app.use(express.json())
  }

  #setupViewEngine () {
    this.#app.set('view engine', 'ejs')
    this.#app.set('views', join(this.#directoryFullName, 'views'))
    this.#app.set('layout', join(this.#directoryFullName, 'views', 'layouts', 'default'))
    this.#app.set('layout extractScripts', true)
    this.#app.set('layout extractStyles', true)
    this.#app.use(expressLayouts)
  }

  /**
   * Parse requests of the content type application/x-www-form-urlencoded. Populates the request object with a body object (req.body).
   */
  #addRequestBody () {
    this.#app.use(express.urlencoded({ extended: false }))
  }

  #serveStaticFiles () {
    this.#app.use(express.static(join(this.#directoryFullName, '..', 'public')))
  }

  /**
   * Add the request-scoped context.
   */
  #addContext () {
    // NOTE! Must be placed before any middle that needs access to the context!
    this.#app.use(httpContext.middleware)
  }

  #setupMorganLogger () {
    const morganLogger = morgan('tiny', {
      stream: {
      /**
       * Writes the message to the logger.
       *
       * @param {string} message - The message to write.
       */
        write: (message: string) => {
          logger.http(message.trim())
        }
      }
    })
    this.#app.use(morganLogger)
  }

  #setupMiddleware () {
    this.#app.use((req, res, next) => {
      // Add a request UUID to each request and store information about
      // each request in the request-scoped context.
      req.requestUuid = randomUUID()
      httpContext.set('request', req)

      // Pass the base URL to the views.
      res.locals.baseURL = this.#baseURL

      next()
    })
  }

  #registerRoutes () {
    const mainRouter = new MainRouter()
    this.#app.use('/', mainRouter.router)
  }
}
