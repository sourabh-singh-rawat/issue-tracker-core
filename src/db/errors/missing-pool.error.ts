import { Errors } from "../../common/enums/errors.enum";
import { StandardError } from "../../common/errors/standard.error";

export class MissingPoolError extends StandardError {
  errorCode;
  errorMessage;

  constructor() {
    super();

    this.errorCode = Errors.ERR_MISSING_POOL;
    this.errorMessage = "PostgresContext requires a client pool";
  }
}
