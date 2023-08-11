export abstract class CustomError extends Error {
  /**
   * Error's name or code as decribed in the common enums
   */
  abstract errorCode: string;
  /**
   * Timestamp of when the error occured
   */
  abstract readonly timestamp: string;
  /**
   * Optional status code for the error related to http requests
   */
  readonly statusCode?: number;

  /**
   * Creates an instance of CustomError
   * @param {Error} message Optional message to pass to error object
   */
  constructor(message?: string) {
    super(message);
  }
}
