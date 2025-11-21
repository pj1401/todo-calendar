import { StartError } from './lib/errors/StartError.js';
import { logger } from './config/winston.js';
import Server from './Server.js';
import { auth } from './utils/auth.js';
import db from './config/db.js';
import ToDoRepository from './repositories/ToDoRepository.js';
import ToDoService from './services/ToDoService.js';
import ToDoController from './controllers/ToDoController.js';
import AuthController from './controllers/AuthController.js';
import AuthRouter from './routes/AuthRouter.js';
import MainRouter from './routes/MainRouter.js';
import ToDoRouter from './routes/ToDoRouter.js';
/**
 * Represents the main application.
 */
export default class Application {
    #port;
    /**
     * Creates a new instance of the application.
     *
     * @param {string} port - A string representing the port number.
     */
    constructor(port) {
        if (!this.#isString(port)) {
            throw new StartError('❌ Port not provided.');
        }
        this.#port = parseInt(String(port));
    }
    /**
     * Starts the server.
     */
    run() {
        try {
            const server = new Server(this.#port, this.#getRouter());
            server.startServer();
        }
        catch (err) {
            if (err instanceof Error) {
                logger.error(err.message, { error: err });
            }
            else {
                logger.error(err);
            }
            process.exitCode = 1;
        }
    }
    /**
     * Check if an unknown is a string.
     *
     * @param {unknown} testString - The string to check.
     * @returns {boolean} True if it is a string.
     */
    #isString(testString) {
        return typeof testString !== 'undefined' && typeof testString === 'string';
    }
    #getRouter() {
        const todoRepository = new ToDoRepository(db);
        const todoService = new ToDoService(todoRepository);
        const todoController = new ToDoController(todoService);
        const authController = new AuthController(auth);
        const authRouter = new AuthRouter(authController);
        const todoRouter = new ToDoRouter(todoController);
        return new MainRouter(todoRouter, authRouter);
    }
}
