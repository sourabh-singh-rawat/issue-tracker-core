import { DatabaseContext } from "./interfaces";
import { ConnectionRefusedError, MissingDataSource } from "./errors";
import {
  DataSource,
  QueryRunner,
  EntityTarget,
  ObjectLiteral,
  QueryBuilder,
} from "typeorm";

/**
 * Provides utility functions to interact with postgres server
 */
export class PostgresContext implements DatabaseContext {
  private readonly _dataSource: DataSource;

  /**
   * Create a new instance with pool
   */
  constructor(dataSource: DataSource) {
    if (!dataSource) {
      throw new MissingDataSource();
    }

    this._dataSource = dataSource;
  }

  /**
   * Connect to the datasource
   */
  connect = async (): Promise<void> => {
    try {
      await this._dataSource.initialize();
    } catch (error) {
      throw new ConnectionRefusedError("Cannot initialize data source");
    }
  };

  /**
   * Executes a sql statement and transforms the result into entity
   * @param sql
   * @param params
   * @returns
   */
  query = async <T>(sql: string, params?: string[]): Promise<T[]> => {
    return await this._dataSource.query<T[]>(sql, params);
  };

  /**
   * Creates a query builder with _dataSource for a given entity class and name.
   * @returns
   */
  queryBuilder = <TEntity extends ObjectLiteral>(
    entityClass: EntityTarget<TEntity>,
    mainAlias: string,
    queryRunner?: QueryRunner,
  ): QueryBuilder<TEntity> => {
    return this._dataSource.createQueryBuilder<TEntity>(
      entityClass,
      mainAlias,
      queryRunner,
    );
  };

  /**
   * Transaction callback wrapper function
   * @param callback
   * @returns
   */
  transaction = async <TReturnValue>(
    callback: (queryRunner: QueryRunner) => TReturnValue,
  ): Promise<TReturnValue> => {
    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let returnValue;
    try {
      returnValue = await callback(queryRunner);

      await queryRunner.commitTransaction();
      return returnValue;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error();
    } finally {
      await queryRunner.release();
    }
  };

  // public get dataSource(): DataSource {
  //   if (!this._dataSource) {
  //     throw new MissingDataSource();
  //   }
  //   return this._dataSource;
  // }
}
