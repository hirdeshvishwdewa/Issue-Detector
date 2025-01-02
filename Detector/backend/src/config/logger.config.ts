import { createLogger, format, transports } from 'winston';

// Define custom log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      // If error stack is available, include it in the log
      return `${timestamp} [${level}]: ${message}\nStack: ${stack}`;
    }
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Create a logger instance
const logger = createLogger({
  level: 'info', // Default log level
  format: logFormat,
  transports: [
    // Write logs to a file
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),

    // Output logs to the console
    new transports.Console({ format: format.combine(format.colorize(), logFormat) }),
  ],
});
logger.info('Logger initialized');
export default logger;