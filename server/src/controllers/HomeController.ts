import type { Request, Response, NextFunction } from 'express'

/**
 * Encapsulates a controller.
 */
export default class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  index (req: Request, res: Response, next: NextFunction) {
    try {
      res.render('home/index')
    } catch (err) {
      next(err)
    }
  }

  home (req: Request, res: Response, next: NextFunction) {
    try {
      res.render('home/home')
    } catch (err) {
      next(err)
    }
  }
}
