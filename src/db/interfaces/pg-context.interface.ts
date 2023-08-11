import { Pool, QueryResult } from "pg";

export interface IPgContext {
  clientPool: Pool;
  query(sql: string, params: string[]): Promise<QueryResult>;
  // transaction();
  // batch();
}
