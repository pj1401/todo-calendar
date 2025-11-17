import type { Request, Response, NextFunction } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../utils/auth.js'

/**
 * Get the session object.
 *
 * @param {Request} req - Express request object.
 * @returns {object} The session object.
 */
async function getSession (req: Request) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  })
  return session
}

/**
 * Authorize if a user is signed in.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const authorizeSignedIn = async (req: Request, res: Response, next: NextFunction) => {
  const session = await getSession(req)

  if (!session) {
    const error = new Error('Not Found')
    next(error)
    return
  }
  next()
}

/**
 * Authorize if a user is not logged in.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const authorizeLoggedOff = async (req: Request, res: Response, next: NextFunction) => {
  const session = await getSession(req)

  if (session) {
    const error = new Error('Not Found')
    next(error)
    return
  }
  next()
}

/**
 * Load user object.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const loadUser = async (req: Request, res: Response, next: NextFunction) => {
  const session = await getSession(req)

  if (!session || !session.user) {
    const error = new Error('Failed to get session.')
    next(error)
    return
  }
  req.user = session.user
  next()
}

/**
 * Authorize if the user should have access to the requested resource.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id !== req.resource.userId) {
    const error = new Error('Forbidden')
    next(error)
    return
  }
  next()
}
