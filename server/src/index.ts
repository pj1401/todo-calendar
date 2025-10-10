import { logger } from './config/winston.js'
import Application from './Application.js'

const NODEJS_EXPRESS_PORT = process.env.NODEJS_EXPRESS_PORT

try {
  const application = new Application(NODEJS_EXPRESS_PORT)
  application.run()
} catch (err) {
  if (err instanceof Error) {
    logger.error(err.message, { error: err })
  } else {
    logger.error(err)
  }
  process.exitCode = 1
}
