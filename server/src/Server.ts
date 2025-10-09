// User-land modules.
import express from 'express'

/**
 * Represents an Express server.
 */
export default class Server {
  #app
  #port: number

  /**
   * Initialises a new instance.
   *
   * @param {number} port - The port number to listen on.
   */
  constructor (port: number) {
    if (!this.#isValidPort(port)) {
      throw new Error('❌ Could not parse port number.')
    }
    this.#app = express()
    this.#port = port
  }

  #isValidPort (port: unknown) {
    return typeof port === 'number' && !Number.isNaN(port)
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
