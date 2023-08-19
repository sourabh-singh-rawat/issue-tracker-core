export interface RepoResponse<T = null> {
  isSuccess: boolean;
  rows: T[] | null;
  rowCount?: number;
  message?: string;
}
