import HomeController from '../controllers/HomeController.js'
import { authorizeLoggedOff, authorizeSignedIn } from '../middlewares/auth.js'
import Router from './Router.js'

export default class HomeRouter extends Router {
  #controller

  constructor () {
    super()
    this.#controller = new HomeController()
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.get('/', authorizeSignedIn, (req, res, next) => {
      this.#controller.index(req, res, next)
    })
    this.router.get('/home', authorizeLoggedOff, (req, res, next) => {
      this.#controller.home(req, res, next)
    })
  }
}
