import Router from './Router.js'
import { authorizeLoggedOff, authorizeSignedIn, authorizeUser, loadUser } from '../middlewares/auth.js'
import ToDoRepository from '../repositories/ToDoRepository.js'
import ToDoService from '../services/ToDoService.js'
import ToDoController from '../controllers/ToDoController.js'
import db from '../config/db.js'

export default class ToDoRouter extends Router {
  #controller

  constructor () {
    super()
    const repository = new ToDoRepository(db)
    const service = new ToDoService(repository)
    this.#controller = new ToDoController(service)
    this.#useParams()
    this.#registerRoutes()
  }

  #useParams () {
    this.router.param('id', (req, res, next, id) => {
      this.#controller.loadToDo(req, res, next, id)
    })
  }

  #registerRoutes () {
    this.router.get('/', authorizeSignedIn, loadUser, (req, res, next) => {
      this.#controller.index(req, res, next)
    })
    this.router.get('/home', authorizeLoggedOff, (req, res, next) => {
      this.#controller.home(req, res, next)
    })

    this.router.post('/', authorizeSignedIn, loadUser, (req, res, next) => {
      this.#controller.createPost(req, res, next)
    })

    this.router.post('/:id/toggle', authorizeSignedIn, loadUser, authorizeUser, (req, res, next) => {
      this.#controller.togglePost(req, res, next)
    })

    this.router.get('/:id/update', authorizeSignedIn, loadUser, authorizeUser, (req, res, next) => {
      this.#controller.update(req, res, next)
    })
    this.router.post('/:id/update', authorizeSignedIn, loadUser, authorizeUser, (req, res, next) => {
      this.#controller.updatePost(req, res, next)
    })
  }
}
