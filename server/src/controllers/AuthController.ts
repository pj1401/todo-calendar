import type { Request, Response, NextFunction } from 'express'

import { auth } from '../utils/auth.js'
import AuthService from '../services/AuthService.js'

/**
 * Encapsulates a controller.
 */
export default class AuthController {
  #service

  constructor (service: AuthService = new AuthService()) {
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
  login (req: Request, res: Response, next: NextFunction) {
    try {
      res.render('auth/login')
    } catch (err) {
      next(err)
    }
  }

  async loginPost (req: Request, res: Response, next: NextFunction) {
    try {
      // this.#service.login(req.body.username, req.body.password)
      const response = await auth.api.signInUsername({
        body: {
          username: req.body.username,
          password: req.body.password
        },
        asResponse: true
      })
      // Store user in session if authenticated.
    } catch (err) {
      next(err)
    }
  }
}
