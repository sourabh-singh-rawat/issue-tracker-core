import { Pool, PoolClient, QueryResult } from "pg";
import { IPgContext } from "./interfaces";
import { PoolNotFound, QueryFailed } from "./errors";

/**
 * Provides utility functions to interact with postgres server using pools
 */
export class PgContext implements IPgContext {
  private readonly _clientPool: Pool;

  /**
   * Create a new instance with pool
   * @param {Pool} pool The client pool
   */
  constructor(pool: Pool) {
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
      client = await this.clientPool.connect();
      const result = await client.query(sql, params);

      return result;
    } catch (error: unknown) {
      throw new QueryFailed();
    } finally {
      if (client) client.release();
    }
  }

  get clientPool() {
    if (!this._clientPool) throw new PoolNotFound();

    return this._clientPool;
  }
}
