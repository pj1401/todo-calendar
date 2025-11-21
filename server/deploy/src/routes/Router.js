// User-land modules.
import express from 'express';
/**
 * Represents an express router.
 */
export default class Router {
    router;
    /**
     * Creates a new instance of a router.
     */
    constructor() {
        this.router = express.Router();
    }
    registerRoutes() {
        this.router.get('/', function (req, res) {
            res.send('Not implemented');
        });
    }
}
