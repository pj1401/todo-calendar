import type { Request, Response, NextFunction } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { APIError } from 'better-auth/api'

import type { auth } from '../utils/auth.js'
import { LoginError } from '../lib/errors/LoginError.js'
import { SignOutError } from '../lib/errors/SignOutError.js'

const EMAIL_TAKEN_CODE = 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL'
const USERNAME_TAKEN_CODE = 'USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER'

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

  /**
   * Renders the view for the sign up form.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
  signUp (req: Request, res: Response, next: NextFunction) {
    try {
      res.render('auth/signup')
    } catch (err) {
      next(err)
    }
  }

  /**
   * Creates a new user.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  async signUpPost (req: Request, res: Response) {
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
      res.redirect('/auth/login')
    } catch (err) {
      this.#handleError(err, req)
      res.redirect('/auth/signup')
    }
  }

  /**
   * Handle the error.
   * @param {unknown} err - The Error object.
   * @param {Request} req - Express request object.
   */
  #handleError (err: unknown, req: Request) {
    if (err instanceof APIError) {
      let flashText = ''
      if (err.body?.code === USERNAME_TAKEN_CODE) {
        flashText = 'The entered username is invalid. Please try something else.'
      } else if (err.body?.code === EMAIL_TAKEN_CODE) {
        flashText = 'The entered email is invalid. Please use another email.'
      }
      req.session.flash = { text: flashText }
    }
  }

  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
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

  /**
   * Authenticate a user.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
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
   * @param {Response} res - Express request object.
   * @param {Response} response - Better-auth Response object.
   */
  #updateCookie (res: Response, response: globalThis.Response) {
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value)
    }
  }

  /**
   * Log out a user.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   */
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
      req.session.destroy((err) => {
        // cannot access session.
        if (err) {
          throw new Error('Failed to access session.')
        }
      })

      res.redirect('/home')
    } catch (err) {
      next(err)
    }
  }
}
