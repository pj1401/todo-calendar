import type { Request, Response, NextFunction } from 'express'
import { fromNodeHeaders } from 'better-auth/node'

import type { auth } from '../utils/auth.js'
import { LoginError } from '../lib/errors/LoginError.js'
import { SignOutError } from '../lib/errors/SignOutError.js'

/**
 * Encapsulates a controller.
 */
export default class AuthController {
  #auth: typeof auth

  /**
   * Initialises a new instance.
   * @param {typeof auth} authApi - The better-auth auth instance.
   */
  constructor (authApi: typeof auth) {
    this.#auth = authApi
  }

  signUp (req: Request, res: Response, next: NextFunction) {
    try {
      res.render('auth/signup')
    } catch (err) {
      next(err)
    }
  }

  async signUpPost (req: Request, res: Response, next: NextFunction) {
    try {
      await this.#auth.api.signUpEmail({
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
      const response = await this.#auth.api.signInUsername({
        body: {
          username: req.body.username,
          password: req.body.password
        },
        asResponse: true
      })

      if (!response.ok) {
        throw new LoginError('Invalid login attempt.')
      }

      this.#updateCookie(res, response)

      res.redirect('..')
    } catch (err) {
      next(err)
    }
  }

  /**
   * Updates the cookie manually.
   *
   * @param {Response} res - Express request object.
   * @param {Response} response - Better-auth Response object.
   */
  #updateCookie (res: Response, response: globalThis.Response) {
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value)
    }
  }

  async logoutPost (req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.#auth.api.signOut({
        headers: fromNodeHeaders(req.headers),
        asResponse: true
      })
      if (!response.ok) {
        throw new SignOutError()
      }
      this.#updateCookie(res, response)

      res.redirect('../home')
    } catch (err) {
      next(err)
    }
  }
}
