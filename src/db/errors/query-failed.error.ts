import { Errors } from "../../common/enums/errors.enum";
import { CustomError } from "../../common/errors/custom.error";

export class QueryFailed extends CustomError {
  errorCode = Errors.QueryFailed;
  timestamp;

  constructor(message?: string) {
    super(message);

    this.timestamp = new Date().toISOString();
  }
}
