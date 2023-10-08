import { Errors } from "../common/enums";
import { StandardError } from "./standard.error";

export class VersionMismatch extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    super();

    this.errorCode = Errors.ERR_VERSION_MISMATCH;
    this.errorMessage = "Version mismatch";
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
