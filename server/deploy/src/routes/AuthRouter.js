import Router from './Router.js';
import { authorizeLoggedOff, authorizeSignedIn } from '../middlewares/auth.js';
export default class AuthRouter extends Router {
    #controller;
    constructor(controller) {
        super();
        this.#controller = controller;
        this.#registerRoutes();
    }
    #registerRoutes() {
        this.router.get('/signup', authorizeLoggedOff, (req, res, next) => {
            this.#controller.signUp(req, res, next);
        });
        this.router.post('/signup', authorizeLoggedOff, (req, res, next) => {
            this.#controller.signUpPost(req, res, next);
        });
        this.router.get('/login', authorizeLoggedOff, (req, res, next) => {
            this.#controller.login(req, res, next);
        });
        this.router.post('/login', authorizeLoggedOff, (req, res, next) => {
            this.#controller.loginPost(req, res, next);
        });
        this.router.post('/logout', authorizeSignedIn, (req, res, next) => {
            this.#controller.logoutPost(req, res, next);
        });
    }
}
