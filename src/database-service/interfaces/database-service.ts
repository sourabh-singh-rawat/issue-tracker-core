import {
  QueryRunner,
  ObjectLiteral,
  EntityTarget,
  QueryBuilder,
} from "typeorm";

export interface DatabaseService {
  connect(): Promise<void>;
  query<T>(sql: string, params?: string[]): Promise<T[]>;
  createQueryBuilder<TEntity extends ObjectLiteral>(
    entity: EntityTarget<TEntity>,
    mainAlias: string,
    queryRunner?: QueryRunner,
  ): QueryBuilder<TEntity>;
  createQueryRunner(): QueryRunner;
  transaction<RValue>(
    queryRunner: QueryRunner,
    callback: (queryRunner: QueryRunner) => RValue,
  ): Promise<RValue | null>;
}
