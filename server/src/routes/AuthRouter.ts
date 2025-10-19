import AuthController from '../controllers/AuthController.js'
import { authorizeLoggedOff } from '../middlewares/auth.js'
import Router from './Router.js'

export default class AuthRouter extends Router {
  #controller

  constructor () {
    super()
    this.#controller = new AuthController()
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.get('/signup', authorizeLoggedOff, (req, res, next) => {
      this.#controller.signUp(req, res, next)
    })
    this.router.post('/signup', authorizeLoggedOff, (req, res, next) => {
      this.#controller.signUpPost(req, res, next)
    })

    this.router.get('/login', authorizeLoggedOff, (req, res, next) => {
      this.#controller.login(req, res, next)
    })
    this.router.post('/login', authorizeLoggedOff, (req, res, next) => {
      this.#controller.loginPost(req, res, next)
    })
  }
}
