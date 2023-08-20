import winston from "winston";

/**
 * Logger should adhere to following interface
 */
export interface ILogger {
  logger: winston.Logger;
  info(message: string): void;
  error(message: string): void;
  addTransport(fileName: string): void;
  // removeTransport(name: string): void;
}
