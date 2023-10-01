import {
  QueryRunner,
  ObjectLiteral,
  EntityTarget,
  QueryBuilder,
} from "typeorm";

export interface DatabaseService {
  connect(): Promise<void>;

  query<T>(sql: string, params?: string[]): Promise<T[]>;

  queryBuilder<TEntity extends ObjectLiteral>(
    entity: EntityTarget<TEntity>,
    mainAlias: string,
    queryRunner?: QueryRunner,
  ): QueryBuilder<TEntity>;

  transaction<RValue>(
    callback: (queryRunner: QueryRunner) => RValue,
  ): Promise<RValue>;
}
