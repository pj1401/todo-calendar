// User-land modules.
import express from 'express'

export default class Router {
  router
  constructor () {
    this.router = express.Router()
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.get('/', function (req, res) {
      res.send('Hello World!')
    })
  }
}
