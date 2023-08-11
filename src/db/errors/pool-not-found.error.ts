import { Errors } from "../../common/enums/errors.enum";
import { CustomError } from "../../common/errors/custom.error";

export class PoolNotFound extends CustomError {
  errorCode = Errors.PoolNotFound;
  timestamp: string;

  constructor() {
    super();
    this.timestamp = new Date().toISOString();
  }
}
