import AuthRouter from './AuthRouter.js'
import HomeRouter from './ToDoRouter.js'
import Router from './Router.js'

/**
 * Represents the main router.
 */
export default class MainRouter extends Router {
  #homeRouter
  #authRouter

  constructor () {
    super()
    this.#homeRouter = new HomeRouter()
    this.#authRouter = new AuthRouter()
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.use('/', this.#homeRouter.router)
    this.router.use('/auth', this.#authRouter.router)
  }
}
