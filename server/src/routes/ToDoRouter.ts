import ToDoController from '../controllers/ToDoController.js'
import { authorizeLoggedOff, authorizeSignedIn, loadUserId } from '../middlewares/auth.js'
import Router from './Router.js'

export default class ToDoRouter extends Router {
  #controller

  constructor () {
    super()
    this.#controller = new ToDoController()
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.get('/', authorizeSignedIn, (req, res, next) => {
      this.#controller.index(req, res, next)
    })
    this.router.get('/home', authorizeLoggedOff, (req, res, next) => {
      this.#controller.home(req, res, next)
    })

    this.router.post('/', authorizeSignedIn, loadUserId, (req, res, next) => {
      this.#controller.createPost(req, res, next)
    })
  }
}
