// User-land modules.
import express from 'express'

/**
 * Represents an Express server.
 */
export default class Server {
  #app
  #port

  /**
   * Initialises a new instance.
   */
  constructor (port: number) {
    this.#app = express()
    this.#port = port
  }

  /**
   * Start the server.
   */
  startServer () {
    const server = this.#app.listen(this.#port, () => {
    const address = server.address()
    if (typeof address === 'object' && address !== null) {
      console.log(`Server running at http://localhost:${address.port}`)
    }
  })
  }
}
