import Router from './Router.js';
/**
 * Represents the main router.
 */
export default class MainRouter extends Router {
    #todoRouter;
    #authRouter;
    constructor(todoRouter, authRouter) {
        super();
        this.#todoRouter = todoRouter;
        this.#authRouter = authRouter;
        this.#registerRoutes();
    }
    #registerRoutes() {
        this.router.use('/', this.#todoRouter.router);
        this.router.use('/auth', this.#authRouter.router);
    }
}
