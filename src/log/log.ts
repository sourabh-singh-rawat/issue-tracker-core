import winston, { format, transports } from "winston";
import { ILogger } from "./interfaces/logger";
import { TransportOptions } from "./interfaces/transport-options";
import { TransportType } from "./enums/transport-types";
import { LoggerOptions } from "./interfaces/logger-options";
const { combine, timestamp, errors, splat, printf } = format;

/**
 * Represents a logging utility based on Winston.
 */
export class Logger implements ILogger {
  readonly logger: winston.Logger;

  /**
   * Creates a new Logger instance.
   * @param {LoggerOptions} options - Configuration options for the logger.
   */
  constructor(options: LoggerOptions) {
    const { metadata } = options;

    /**
     * Formats log object for output
     * @param {Object} log - The log message object
     * @returns {string} - The formatted log message
     */
    const printFormat = printf(({ level, message, service, timestamp }) => {
      const output = { level, message, service, timestamp };
      return JSON.stringify(output);
    });

    const format = combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      splat(),
      printFormat,
    );

    // Creating the logger object
    this.logger = winston.createLogger({
      level: "info",
      format,
      defaultMeta: metadata,
    });

    if (process.env.NODE_ENV !== "production") {
      this.logger.add(new transports.Console({ format }));
    }
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  addTransport(fileName: string, opts?: TransportOptions) {
    if (!opts?.type) {
      throw new Error("Please provide opts.type");
    }

    if (opts.type === TransportType.FILE) {
      const transport = new transports.File({ filename: fileName });
      return this.logger.add(transport);
    }
  }
}
