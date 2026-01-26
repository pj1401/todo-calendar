// Must be first!
import httpContext from 'express-http-context'

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import type { Server as nodeHttpServer } from 'node:http'

import express, { ErrorRequestHandler } from 'express'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import morgan from 'morgan'
import helmet from 'helmet'

import { logger } from './config/winston.js'
import { sessionOptions } from './config/sessionOptions.js'
import { ServerError } from './lib/errors/ServerError.js'
import type MainRouter from './routes/MainRouter.js'
import type { Flash, ToDo, User } from './lib/interfaces/index.js'
import { convertToHttpError } from './lib/util.js'

// Express request object.
declare module 'express-serve-static-core' {
  interface Request {
    requestUuid: string
    user: User
    resource: ToDo
  }
}
declare module 'express-session' {
  interface Session {
    flash?: Flash
  }
}

/**
 * Represents an Express server.
 */
export default class Server {
  #app
  #port: number
  #mainRouter: MainRouter
  #baseURL
  #httpServer!: nodeHttpServer
  #directoryFullName

  /**
   * Initialises a new instance.
   * @param {number} port - The port number to listen on.
   * @param {MainRouter} mainRouter - The main router for the server.
   */
  constructor (port: number, mainRouter: MainRouter) {
    if (!this.#isValidPort(port)) {
      throw new ServerError('❌ Could not parse port number.')
    }
    this.#app = express()
    this.#port = port
    this.#mainRouter = mainRouter

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
      this.#setHeaders()
      this.#parseRequests()
      this.#setupViewEngine()
      this.#addRequestBody()
      this.#serveStaticFiles()
      this.#setupSession()
      this.#addContext()
      this.#setupMorganLogger()
      this.#setupMiddleware()
      this.#registerRoutes()
      this.#setupErrorHandler()
      this.#httpServer = this.#getServer()
    } catch (err) {
      logger.error(err)
      process.exitCode = 1
    }
  }

  /**
   * Set security headers using helmet.
   */
  #setHeaders () {
    this.#app.use(helmet())
    this.#app.use(
      helmet.contentSecurityPolicy({
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          /* eslint-disable @stylistic/quotes */
          'script-src': ["'self'", 'cdnjs.cloudflare.com']
          /* eslint-enable @stylistic/quotes */
        }
      })
    )
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

  #setupSession () {
    if (process.env.NODE_ENV === 'production') {
      this.#app.set('trust proxy', 1) // trust first proxy
    }
    this.#app.use(session(sessionOptions))
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
      // Flash messages - survives only a round trip.
      if (req.session.flash) {
        res.locals.flash = req.session.flash
        delete req.session.flash
      }

      next()
    })
  }

  #registerRoutes () {
    this.#app.use('/', this.#mainRouter.router)
  }

  #setupErrorHandler () {
    const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
      logger.error(err.message, { error: err })
      const httpError = convertToHttpError(err)
      if (httpError.status === 401) {
        res
          .status(401)
          .redirect('/home')
        return
      }
      if (httpError.status === 403) {
        res
          .status(403)
          .sendFile(join(this.#directoryFullName, 'views', 'errors', '403.html'))
        return
      }
      if (httpError.status === 404) {
        res
          .status(403)
          .sendFile(join(this.#directoryFullName, 'views', 'errors', '404.html'))
        return
      }
      if (process.env.NODE_ENV === 'production') {
        res
          .status(500)
          .sendFile(join(this.#directoryFullName, 'views', 'errors', '500.html'))
        return
      }
      res
        .status(httpError.status || 500)
        .render('errors/error', { error: {
          status: httpError.status || 500,
          message: httpError.message } })
    }
    this.#app.use(errorHandler)
  }
}
