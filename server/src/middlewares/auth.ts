import type { Request, Response, NextFunction } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../utils/auth.js'

/**
 * Authorize if a user is signed in.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const authorizeSignedIn = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  })
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
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  })

  if (session) {
    const error = new Error('Not Found')
    next(error)
    return
  }
  next()
}

export const loadUserId = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  })
  if (!session) {
    const error = new Error('Failed to get session.')
    next(error)
  }
  req.body.userId = session?.session.userId
  next()
}
