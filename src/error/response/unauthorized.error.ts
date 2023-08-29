import { StatusCodes } from "http-status-codes";
import { Errors } from "../../common/enums";
import { ResponseError } from "./response-errors";

export class UnauthorizedError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);

    this.errorCode = Errors.ERR_UNAUTHORIZED;
    this.errorMessage = message;
  }
}
