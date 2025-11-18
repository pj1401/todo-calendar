import { getTestDb } from './testDb.js'
import ToDoRepository from '../src/repositories/ToDoRepository.js'
import ToDoService from '../src/services/ToDoService.js'
import type { Database } from 'better-sqlite3'

describe('ToDoService', () => {
  let db: Database
  let repository: ToDoRepository
  let service: ToDoService

  beforeEach(() => {
    db = getTestDb()
    repository = new ToDoRepository(db)
    service = new ToDoService(repository)
    db.prepare(`INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt, username, displayUsername)
                VALUES ('u1', 'Test User', 'test@example.com', 1, datetime('now'), datetime('now'), 'user1', 'testUser')`).run()
  })

  afterEach(() => {
    db.close()
  })

  it('can insert todos', async () => {
    const info = await service.insert('Test todo', 'u1')

    const numberOfNewRows = 1
    expect(info.changes).toEqual(numberOfNewRows)
  })

  it('can get todos', async () => {
    db.prepare(`INSERT INTO todos (userId, title, completed) VALUES ('u1', 'Test todo', 0)`).run()

    const todos = await service.get('u1')

    expect(todos).toHaveLength(1)
    expect(todos[0].title).toBe('Test todo')
    expect(todos[0].completed).toBeFalsy()
  })

  it('can get a todo by id', async () => {
    db.prepare(`INSERT INTO todos (userId, title, completed) VALUES ('u1', 'Test todo', 0)`).run()

    const todo = await service.getById(1)

    expect(todo.title).toBe('Test todo')
    expect(todo.completed).toBeFalsy()
  })
})
