import { StatusCodes } from "http-status-codes";
import { Errors } from "../../enums";
import { ResponseError } from "./response-errors";

export class UnsupportedMediaTypeError extends ResponseError {
  errorCode: string;
  errorMessage: string;
  statusCode?: number | undefined;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_UNSUPPORTED_MEDIA_TYPE;
    this.errorMessage = message;
    this.statusCode = StatusCodes.UNSUPPORTED_MEDIA_TYPE;
  }
}
