import Server from './Server.js'

const NODEJS_EXPRESS_PORT = process.env.NODEJS_EXPRESS_PORT

try {
  if (typeof NODEJS_EXPRESS_PORT === 'undefined') {
    throw new Error('❌ Port number not provided.')
  }

  const port = parseInt(NODEJS_EXPRESS_PORT)

  if (typeof port !== 'number') {
    throw new Error('❌ Could not parse port number.')
  }

  const server = new Server(port)
  server.startServer()
} catch (err) {
  console.error(err)
}
