import type { Request, Response, NextFunction } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../utils/auth.js'
import ToDoService from '../services/ToDoService.js'

/**
 * Encapsulates a controller.
 */
export default class ToDoController {
  #service

  constructor (service: ToDoService = new ToDoService()) {
    this.#service = service
  }

  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  async index (req: Request, res: Response, next: NextFunction) {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
      })
      if (!session) {
        throw new Error('Failed to get session.')
      }
      const todos = await this.#service.get(session?.session.userId)
      const viewData = {
        todos,
        user: { displayUsername: session?.user.displayUsername }
      }
      res.render('todo/index', { viewData })
    } catch (err) {
      next(err)
    }
  }

  home (req: Request, res: Response, next: NextFunction) {
    try {
      res.render('todo/home')
    } catch (err) {
      next(err)
    }
  }

  async createPost (req: Request, res: Response, next: NextFunction) {
    try {
      const { title, userId } = req.body
      if (!title) {
        throw new Error('Title is required.')
      }
      const todo = await this.#service.insert(title.trim(), userId)
      if (!todo) {
        throw new Error('Failed to create todo.')
      }
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  }
}
