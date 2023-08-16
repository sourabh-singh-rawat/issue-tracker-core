import { Errors } from "../../common/enums/errors.enum";
import { CustomError } from "../../common/errors/custom.error";

export class QueryFailed extends CustomError {
  errorCode;
  errorMessage;
  timestamp;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_QUERY_FAILED;
    this.errorMessage = message;
    this.timestamp = new Date().toISOString();
  }
}
