export abstract class CustomError extends Error {
  /**
   * Error code as described in the common enums
   */
  abstract errorCode: string;
  /**
   * Error message explaining the error
   */
  abstract readonly errorMessage: string;
  /**
   * Timestamp at which the error occured
   * */
  abstract readonly timestamp: string;
  /**
   * Optional statusCode which represents the HTTP status code
   */
  readonly statusCode?: number;

  constructor(message?: string) {
    super(message);
  }
}
