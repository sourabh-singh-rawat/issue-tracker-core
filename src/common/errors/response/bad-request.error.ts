import { StatusCodes } from "http-status-codes";
import { Errors } from "../../enums";
import { ResponseError } from "./response-errors";

export class BadRequestError extends ResponseError {
  errorCode: string;
  errorMessage: string;
  statusCode?: number | undefined;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_BAD_REQUEST;
    this.errorMessage = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}