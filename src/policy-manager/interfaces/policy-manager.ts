import { DataSource } from "typeorm";
import { TypeORMAdapterConfig } from "typeorm-adapter/lib/adapter";

export interface PolicyManager {
  savePolicy(subject: string, object: string, action: string): Promise<boolean>;
  saveGroupingPolicy(parent: string, child: string): Promise<void>;
  saveRoleForUser(userId: string, roleId: string): Promise<boolean>;
  getRoleForUser(userId: string, object: string): Promise<string>;
  getPermissionsForUser(userId: string, object: string): Promise<string[][]>;
  initialize(
    dataSource: DataSource,
    config: TypeORMAdapterConfig,
  ): Promise<void>;
}
