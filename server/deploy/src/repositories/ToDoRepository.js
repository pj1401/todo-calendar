import { RepositoryError } from '../lib/errors/index.js';
/**
 * Encapsulates a repository.
 */
export default class ToDoRepository {
    #db;
    constructor(db) {
        this.#db = db;
    }
    /**
     * Get todos.
     * @param {string} userId - The userId as a string.
     * @returns {Promise<ToDoRow[]>} The requested rows.
     */
    async get(userId) {
        try {
            return await this.#db.prepare('SELECT * FROM todos WHERE userId = ?').all(userId);
        }
        catch (err) {
            throw new RepositoryError('Failed to get rows.', err);
        }
    }
    /**
     * Get a single row by id.
     * @param {number} id - The id of the todo.
     * @returns {Promise<ToDoRow>} The requested row.
     */
    async getById(id) {
        try {
            return await this.#db.prepare('SELECT * FROM todos WHERE id = ? LIMIT 1').get(id);
        }
        catch (err) {
            throw new RepositoryError('Failed to get row.', err);
        }
    }
    /**
     * Get a single row.
     * @param {number} id - The id of the todo.
     * @param {string} userId - The userId.
     * @returns {Promise<ToDoRow>} The requested row.
     */
    async getOne(id, userId) {
        try {
            return await this.#db.prepare('SELECT * FROM todos WHERE id = ? AND userId = ? LIMIT 1').get(id, userId);
        }
        catch (err) {
            throw new RepositoryError('Failed to get row.', err);
        }
    }
    /**
     * Insert a new row.
     * @param {string} title - The title of the todo.
     * @param {string} userId - The userId.
     * @returns {Promise<RunResult>} An info object.
     */
    async insert(title, userId) {
        try {
            const statement = this.#db.prepare('INSERT INTO todos (userId, title) VALUES (?, ?)');
            return await statement.run(userId, title);
        }
        catch (err) {
            throw new RepositoryError('Failed to create row.', err);
        }
    }
    /**
     * Update the todo title.
     * @param {number} id - The id of the todo.
     * @param {string} userId - The userId.
     * @param {string} title - The new title.
     * @returns {Promise<RunResult>} An info object.
     */
    async update(id, userId, title) {
        try {
            const statement = this.#db.prepare('UPDATE todos SET title = ? WHERE id = ? AND userId = ?');
            return await statement.run(title, id, userId);
        }
        catch (err) {
            throw new RepositoryError('Failed to update row.', err);
        }
    }
    /**
     * Update the completed property.
     * @param {number} id - The id of the todo.
     * @param {string} userId - The userId.
     * @param {number} completed - The new value of the completed property.
     * @returns {Promise<RunResult>} An info object.
     */
    async updateCompleted(id, userId, completed) {
        try {
            const statement = this.#db.prepare('UPDATE todos SET completed = ? WHERE id = ? AND userId = ?');
            return await statement.run(completed ? 1 : 0, id, userId);
        }
        catch (err) {
            throw new RepositoryError('Failed to update row.', err);
        }
    }
    /**
     * Delete a row.
     * @param {number} id - The id of the row.
     * @param {string} userId - The userId.
     * @returns {Promise<ToDoRow>} The requested row.
     */
    async delete(id, userId) {
        try {
            const statement = this.#db.prepare('DELETE FROM todos WHERE id = ? AND userId = ? LIMIT 1');
            return await statement.run(id, userId);
        }
        catch (err) {
            throw new RepositoryError('Failed to delete row.', err);
        }
    }
}
