import type { SessionOptions } from 'express-session'

const SESSION_NAME = process.env.SESSION_NAME
const SESSION_SECRET = process.env.SESSION_SECRET
const NODE_ENV = process.env.NODE_ENV

// Options object for the session middleware.
export const sessionOptions: SessionOptions = {
  name: SESSION_NAME, // Don't use default session cookie name.
  secret: `${SESSION_SECRET}`, // Change it!!! The secret is used to hash the session with HMAC.
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'lax',
    secure: NODE_ENV === 'production' // Serve secure cookies in production environment.
  }
}
