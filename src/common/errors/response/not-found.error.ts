import { StatusCodes } from "http-status-codes";
import { Errors } from "../../enums";
import { ResponseError } from "./response-errors";

export class NotFoundError extends ResponseError {
  errorCode: string;
  errorMessage: string;
  statusCode?: number | undefined;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_NOT_FOUND;
    this.errorMessage = message;
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
