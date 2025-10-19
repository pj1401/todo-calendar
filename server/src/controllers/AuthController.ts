import type { Request, Response, NextFunction } from 'express'

import { auth } from '../utils/auth.js'
import { LoginError } from '../lib/errors/LoginError.js'

/**
 * Encapsulates a controller.
 */
export default class AuthController {
  signUp (req: Request, res: Response, next: NextFunction) {
    try {
      res.render('auth/signup')
    } catch (err) {
      next(err)
    }
  }

  async signUpPost (req: Request, res: Response, next: NextFunction) {
    try {
      // this.#service.signUp(req.body.username, req.body.password)
      const response = await auth.api.signUpEmail({
        body: {
          email: req.body.email, // required
          name: req.body.name, // required
          password: req.body.password, // required
          username: req.body.username, // required
          displayUsername: req.body.username
        }
      })
      res.redirect('./login')
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
  login (req: Request, res: Response, next: NextFunction) {
    try {
      res.render('auth/login')
    } catch (err) {
      next(err)
    }
  }

  async loginPost (req: Request, res: Response, next: NextFunction) {
    try {
      const response = await auth.api.signInUsername({
        body: {
          username: req.body.username,
          password: req.body.password
        },
        asResponse: true
      })

      if (!response.ok) {
        throw new LoginError('Invalid login attempt.')
      }

      this.#storeCookie(res, response)

      res.redirect('..')
    } catch (err) {
      next(err)
    }
  }

  /**
   * Store cookie manually.
   *
   * @param {Response} res - Express request object.
   * @param {Response} response - Better-auth Response object.
   */
  #storeCookie (res: Response, response: globalThis.Response) {
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value)
    }
  }
}
