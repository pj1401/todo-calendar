import Router from './Router.js'
import type AuthRouter from './AuthRouter.js'
import type ToDoRouter from './ToDoRouter.js'

/**
 * Represents the main router.
 */
export default class MainRouter extends Router {
  #todoRouter: ToDoRouter
  #authRouter: AuthRouter

  constructor (todoRouter: ToDoRouter, authRouter: AuthRouter) {
    super()
    this.#todoRouter = todoRouter
    this.#authRouter = authRouter
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.use('/', this.#todoRouter.router)
    this.router.use('/auth', this.#authRouter.router)
  }
}
