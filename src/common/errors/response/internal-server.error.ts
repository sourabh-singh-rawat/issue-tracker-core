import { StatusCodes } from "http-status-codes";
import { Errors } from "../../enums";
import { ResponseError } from "./response-errors";

export class InternalServerError extends ResponseError {
  errorCode: string;
  errorMessage: string;
  statusCode?: number | undefined;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_INTERNAL_SERVER;
    this.errorMessage = message;
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
