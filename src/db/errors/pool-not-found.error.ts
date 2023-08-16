import { Errors } from "../../common/enums/errors.enum";
import { CustomError } from "../../common/errors/custom.error";

export class PoolNotFound extends CustomError {
  errorCode;
  errorMessage;
  timestamp;

  constructor() {
    super();
    this.errorCode = Errors.ERR_POOL_NOT_FOUND;
    this.errorMessage = "Pool not found";
    this.timestamp = new Date().toISOString();
  }
}
