import Database from 'better-sqlite3'

/**
 * Create an in-memory database.
 * @returns {Database.Database} A database.
 */
export const getTestDb = (): Database.Database => {
  const db = new Database(':memory:')

  db.exec(`
    CREATE TABLE IF NOT EXISTS user (
      id TEXT NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      emailVerified INTEGER NOT NULL,
      image TEXT,
      createdAt DATE NOT NULL,
      updatedAt DATE NOT NULL,
      username TEXT UNIQUE,
      displayUsername TEXT
    );

    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    );
  `)

  return db
}
