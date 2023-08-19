import { Errors } from "../enums";
import { StandardError } from "./standard.error";

export class UtilityError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_UTILITY;
    this.errorMessage = message;
  }
}
