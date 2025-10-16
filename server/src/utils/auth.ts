import { betterAuth } from 'better-auth'
import { username } from 'better-auth/plugins'
import Database from 'better-sqlite3'

export const auth = betterAuth({
  database: new Database('.var/db/todos.db'),
  plugins: [
    username()
  ]
})
