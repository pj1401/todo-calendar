import type { Request, Response, NextFunction } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../utils/auth.js'

/**
 * Encapsulates a controller.
 */
export default class ToDoController {
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
      const viewData = {
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
}
