import Router from './Router'

export default class HomeRouter extends Router {
  constructor () {
    super()
    this.#registerRoutes()
  }

  #registerRoutes () {
    this.router.get('/', function (req, res) {
      res.send('Hello World!')
    })
  }
}
