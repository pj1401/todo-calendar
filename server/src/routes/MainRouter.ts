import HomeRouter from './HomeRouter.js'
import Router from './Router.js'

/**
 * Represents the main router.
 */
export default class MainRouter extends Router {
  #homeRouter

  constructor () {
    super()
    this.#homeRouter = new HomeRouter()
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.use('/', this.#homeRouter.router)
  }
}
