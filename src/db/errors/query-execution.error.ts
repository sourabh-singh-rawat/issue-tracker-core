import { Errors } from "../../common/enums/errors.enum";
import { StandardError } from "../../common/errors/standard.error";

export class QueryExecutionError extends StandardError {
  errorCode;
  errorMessage;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_QUERY_EXECUTION;
    this.errorMessage = message;
  }
}
