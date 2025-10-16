import bcrypt from 'bcrypt'
import { Database } from 'sqlite3'
import { mkdirp } from 'mkdirp'

mkdirp.sync('../var/db')

const db = new Database('../var/db/session.sqlite')

// Setup the database schema.
db.serialize(async () => {
  db.run('CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    name TEXT, \
    email TEXT UNIQUE, \
    email_verified INTEGER \
  )')

  const password = await bcrypt.hash('098letmein', 10)
  db.run('INSERT OR IGNORE INTO users (username, hashed_password) VALUES (?, ?)', [
    'pat',
    password
  ])
})

module.exports = db
