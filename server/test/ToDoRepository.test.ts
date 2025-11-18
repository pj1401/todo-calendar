import { getTestDb } from './testDb.js'
import ToDoRepository from '../src/repositories/ToDoRepository.js'
import type { Database } from 'better-sqlite3'

describe('ToDoRepository', () => {
  let db: Database
  let repository: ToDoRepository

  beforeEach(() => {
    db = getTestDb()
    repository = new ToDoRepository(db)
    db.prepare(`INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt, username, displayUsername)
                VALUES ('u1', 'Test User', 'test@example.com', 1, datetime('now'), datetime('now'), 'user1', 'testUser')`).run()
  })

  afterEach(() => {
    db.close()
  })

  it('can insert a todo', async () => {
    const info = await repository.insert('Test todo', 'u1')

    const numberOfNewRows = 1
    expect(info.changes).toEqual(numberOfNewRows)
  })

  it('can get todos', async () => {
    db.prepare(`INSERT INTO todos (userId, title, completed) VALUES ('u1', 'Test todo', 0)`).run()

    const todos = await repository.get('u1')

    expect(todos).toHaveLength(1)
    expect(todos[0].title).toBe('Test todo')
    expect(todos[0].completed).toEqual(0)
  })

  it('can delete a todo', async () => {
    db.prepare(`INSERT INTO todos (id, userId, title, completed) VALUES (1, 'u1', 'Test todo', 0)`).run()
    const id = 1
    const result = await repository.delete(id)
    expect(result.id).toEqual(id)
  })
})
