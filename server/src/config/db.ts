import fs from 'node:fs'
import path from 'node:path'

import Database from 'better-sqlite3'

// Create database file if it doesn't exist.
const dbPath = path.resolve(__dirname, '../var/db/todos.sqlite')
fs.mkdirSync(path.dirname(dbPath), { recursive: true })

const db = new Database(dbPath)

// Setup the database schema.
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    username TEXT UNIQUE
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );
`)

export default db
