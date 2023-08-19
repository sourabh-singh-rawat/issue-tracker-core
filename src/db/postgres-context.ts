import { Pool, PoolClient, QueryResult } from "pg";
import { DatabaseContext } from "./interfaces";
import { MissingPoolError, QueryExecutionError } from "./errors";

/**
 * Provides utility functions to interact with postgres server using pools
 */
export class PostgresContext implements DatabaseContext {
  private readonly _clientPool: Pool;

  /**
   * Create a new instance with pool
   * @param {Pool} pool The client pool
   */
  constructor(pool: Pool) {
    if (!pool) throw new MissingPoolError();

    this._clientPool = pool;
  }

  /**
   * Executes query using any of the available clients in the pool
   * @param {string} sql The sql statement to execute
   * @param {Array<string>} params Arrays of inputs to sql statement
   * @returns {Promise} result of the executed query
   */
  async query(sql: string, params?: string[]): Promise<QueryResult> {
    let client: PoolClient | null = null;

    try {
      client = await this._clientPool.connect();
      const result = await client.query(sql, params);

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.toString() : "Unknown execution error";

      throw new QueryExecutionError(errorMessage);
    } finally {
      if (client) client.release();
    }
  }
}
