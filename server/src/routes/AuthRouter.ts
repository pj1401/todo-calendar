import AuthController from '../controllers/AuthController.js'
import Router from './Router.js'

export default class AuthRouter extends Router {
  #controller

  constructor () {
    super()
    this.#controller = new AuthController()
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.get('/login', (req, res, next) => {
      this.#controller.login(req, res, next)
    })
  }
}
