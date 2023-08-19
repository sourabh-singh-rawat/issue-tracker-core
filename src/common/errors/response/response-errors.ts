import { Errors } from "../../enums";
import { StandardError } from "./../standard.error";

export class ResponseError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_RESPONSE;
    this.errorMessage = message;
  }
}
