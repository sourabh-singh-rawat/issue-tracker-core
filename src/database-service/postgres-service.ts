import { Logger } from "pino";
import { DatabaseService } from "./interfaces";
import { ConnectionRefusedError, MissingDataSource } from "./errors";
import { DataSource, QueryRunner, EntityTarget, ObjectLiteral } from "typeorm";

export class PostgresService implements DatabaseService {
  private readonly logger;
  private readonly dataSource;

  constructor(dataSource: DataSource, logger: Logger) {
    if (!dataSource) throw new MissingDataSource();

    this.logger = logger;
    this.dataSource = dataSource;
  }

  /**
   * Initializes the connection to the postgres cluster
   * Must have an data source
   */
  connect = async (): Promise<void> => {
    try {
      await this.dataSource.initialize();
      this.logger.info("Server connected to postgres cluster");
    } catch (error) {
      console.log(error);
      throw new ConnectionRefusedError(error!.toString());
    }
  };

  /**
   * Executes a sql statement and transforms the result into entity
   * @param sql The sql statement to execute
   * @param params The parameters to query
   * @returns Result object
   */
  query = async <T>(sql: string, params?: string[]): Promise<T[]> => {
    return await this.dataSource.query<T[]>(sql, params);
  };

  /**
   * Creates a query builder with dataSource for a given entity and name.
   * @returns
   */
  createQueryBuilder = <TEntity extends ObjectLiteral>(
    entityClass: EntityTarget<TEntity>,
    mainAlias: string,
    queryRunner?: QueryRunner,
  ) => {
    return this.dataSource.createQueryBuilder<TEntity>(
      entityClass,
      mainAlias,
      queryRunner,
    );
  };

  createQueryRunner = () => {
    return this.dataSource.createQueryRunner();
  };

  /**
   * Execute transactions
   * @param callback
   * @returns
   */
  transaction = async <TReturnValue>(
    queryRunner: QueryRunner,
    callback: (queryRunner: QueryRunner) => TReturnValue,
  ): Promise<TReturnValue | null> => {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let returnValue = null;
    try {
      returnValue = await callback(queryRunner);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return returnValue;
  };
}
