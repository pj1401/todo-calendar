/**
 * Config for winston logger.
 * @see https://github.com/winstonjs/winston?tab=readme-ov-file#winston
 */
import { createLogger, format, transports } from 'winston';
export const logger = createLogger({
    level: process.env.LOG_LEVEL || 'http'
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(format.colorize(), format.simple())
    }));
}
