import { betterAuth } from 'better-auth'
import { username } from 'better-auth/plugins'
import db from '../config/db.js'

export const auth = betterAuth({
  database: db,
  emailVerification: {
    sendOnSignUp: false
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false
  },
  session: {
    expiresIn: 60 * 60 * 24, // 1 day
    disableSessionRefresh: true
  },
  plugins: [
    username()
  ]
})
