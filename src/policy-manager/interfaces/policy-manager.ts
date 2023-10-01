import { DataSource } from "typeorm";
import { TypeORMAdapterConfig } from "typeorm-adapter/lib/adapter";

export interface PolicyManager<A extends string> {
  initialize(
    dataSource: DataSource,
    config: TypeORMAdapterConfig,
  ): Promise<void>;
  addPolicy(subject: string, object: string, action: A): void;
}
