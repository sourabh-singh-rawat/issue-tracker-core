import { UtilityError } from "../errors/utility.error";
import { RepoResponse } from "../interfaces";

export class DatabaseRepoResponse<T> implements RepoResponse<T> {
  isSuccess: RepoResponse["isSuccess"];
  rows: RepoResponse<T>["rows"];
  rowCount?: RepoResponse["rowCount"];
  message?: RepoResponse["message"];

  constructor({ isSuccess = false, rows, rowCount, message }: RepoResponse<T>) {
    if (!isSuccess && !message) {
      throw new UtilityError("An error response requires a message");
    }

    if (isSuccess && !rows?.length) {
      throw new UtilityError("A successful response requires at least one row");
    }

    this.isSuccess = isSuccess;
    this.rows = rows;
    this.rowCount = rowCount;
    this.message = message;
  }
}
