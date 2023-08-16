import { QueryResult } from "pg";

export interface DatabaseContext {
  query(sql: string, params: string[]): Promise<QueryResult>;
  // transaction();
  // batch();
}
