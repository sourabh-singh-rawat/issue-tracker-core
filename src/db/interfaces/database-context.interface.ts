import {
  QueryRunner,
  ObjectLiteral,
  EntityTarget,
  QueryBuilder,
} from "typeorm";

export interface DatabaseContext {
  connect(): Promise<void>;

  query<T>(sql: string, params?: string[]): Promise<T[]>;

  queryBuilder<TEntity extends ObjectLiteral>(
    entityClass: EntityTarget<TEntity>,
    mainAlias: string,
    queryRunner?: QueryRunner,
  ): QueryBuilder<TEntity>;

  transaction<RValue>(
    callback: (queryRunner: QueryRunner) => RValue,
  ): Promise<RValue | void>;
}
