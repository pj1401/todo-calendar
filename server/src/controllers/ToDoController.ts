import type { Request, Response, NextFunction } from 'express'
import ToDoService from '../services/ToDoService.js'

/**
 * Encapsulates a controller.
 */
export default class ToDoController {
  #service

  constructor (service: ToDoService) {
    this.#service = service
  }

  /**
   * Provide req.resource if :id is present.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @param {string} id - The id of the todo to load.
   */
  async loadToDo (req: Request, res: Response, next: NextFunction, id: string) {
    try {
      req.resource = await this.#service.getById(parseInt(id))
      next()
    } catch (err) {
      next(err)
    }
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
      if (!req.user) {
        throw new Error('Failed to load user.')
      }
      const todos = await this.#service.get(req.user?.id)
      const viewData = {
        todos,
        user: { displayUsername: req.user?.displayUsername }
      }
      res.render('todo/index', { viewData })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Render the home view.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  home (req: Request, res: Response, next: NextFunction) {
    try {
      res.render('todo/home')
    } catch (err) {
      next(err)
    }
  }

  /**
   * Create a new todo.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  async createPost (req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body
      if (!title) {
        throw new Error('Title is required.')
      }
      const userId = req.user.id
      const info = await this.#service.insert(title.trim(), userId)
      if (!info) {
        throw new Error('Failed to create todo.')
      }
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  }

  /**
   * Toggle the completed property.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  async togglePost (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { completed } = req.body
      await this.#service.updateCompleted(id, req.user.id, completed)
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  }

  /**
   * Render the update todo view.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  async update (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const todo = await this.#service.getOne(parseInt(id), userId)
      res.render('todo/update', {
        viewData: todo
      })
    } catch (err) {
      next(err)
    }
  }

  /**
   * Update the todo.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  async updatePost (req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body
      if (!title) {
        throw new Error('Title is required.')
      }
      const userId = req.user.id
      const id = req.resource.id
      const info = await this.#service.update(id, userId, title.trim())
      if (!info) {
        throw new Error('Failed to update todo.')
      }
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  }
}
