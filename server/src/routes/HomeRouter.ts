import HomeController from '../controllers/HomeController.js'
import Router from './Router.js'

export default class HomeRouter extends Router {
  #controller

  constructor () {
    super()
    this.#controller = new HomeController()
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.get('/', (req, res, next) => {
      this.#controller.index(req, res, next)
    })
  }
}
