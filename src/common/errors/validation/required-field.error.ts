import { Errors } from "../../enums";
import { ValidationError } from "./validation.error";

export class RequiredFieldError extends ValidationError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_REQUIRED_FIELD;
    this.errorMessage = message;
  }
}
