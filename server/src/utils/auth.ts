import { betterAuth } from 'better-auth'
import { username } from 'better-auth/plugins'
import Database from 'better-sqlite3'

export const auth = betterAuth({
  database: new Database('./src/var/db/todos.db'),
  emailAndPassword: {
    enabled: true
  },
  session: {
    expiresIn: 60 * 60 * 24, // 1 day
    disableSessionRefresh: true
  },
  plugins: [
    username()
  ]
})
