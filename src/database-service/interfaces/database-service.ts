import { EntityTarget, ObjectLiteral, QueryRunner } from "typeorm";
import { SelectQueryBuilder } from "typeorm/browser";
import { Dictionary } from "lodash";

export interface DatabaseService {
  connect(): Promise<void>;
  query<T extends ObjectLiteral>(
    sql: string,
    params?: (string | number | undefined)[],
  ): Promise<Dictionary<T[keyof T]>[]>;
  createQueryBuilder<E extends ObjectLiteral>(
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<E>;
  createDeleteQueryBuilder<Entity extends ObjectLiteral>(
    entityClass: EntityTarget<Entity>,
    alias: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Entity>;
  createQueryRunner(): QueryRunner;
  transaction<RValue>(
    queryRunner: QueryRunner,
    callback: (queryRunner: QueryRunner) => RValue,
  ): Promise<RValue | null>;
}
