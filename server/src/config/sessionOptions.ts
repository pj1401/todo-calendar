import type { SessionOptions } from 'express-session'
import { ConnectSessionKnexStore } from 'connect-session-knex'
import knexConstructor from 'knex'

const store = new ConnectSessionKnexStore({
  knex: knexConstructor({
    client: 'sqlite',
    connection: {
      filename: './var/session.sqlite'
    }
  }),
  cleanupInterval: 1000 * 60 * 60 * 24 // Clear sessions after 1 day.
})

// Options object for the session middleware.
export const sessionOptions: SessionOptions = {
  name: process.env.SESSION_NAME, // Don't use default session cookie name.
  secret: `${process.env.SESSION_SECRET}`, // Change it!!! The secret is used to hash the session with HMAC.
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  store,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' // Serve secure cookies in production environment.
  }
}
