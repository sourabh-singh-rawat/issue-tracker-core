import TypeORMAdapter from "typeorm-adapter";
import { PolicyManager } from "./interfaces/policy-manager";
import { DataSource } from "typeorm";
import { TypeORMAdapterConfig } from "typeorm-adapter/lib/adapter";
import { Logger } from "pino";
import { Enforcer, newEnforcer } from "casbin";

export abstract class CasbinPolicyManager<A extends string>
  implements PolicyManager<A>
{
  private readonly logger;
  enforcer?: Enforcer;
  private policies: { subject: string; object: string; action: string }[] = [];
  private groupingPolicies: { parent: string; child: string }[] = [];

  constructor(logger: Logger) {
    this.logger = logger;
  }

  // Should initialize the connected using adapter and create enforcer
  initialize = async (dataSource: DataSource, config: TypeORMAdapterConfig) => {
    const adapter = await TypeORMAdapter.newAdapter(
      { connection: dataSource.manager.connection },
      { customCasbinRuleEntity: config.customCasbinRuleEntity },
    );

    this.enforcer = await newEnforcer("./src/app/model.conf", adapter);
    this.enforcer.enableLog(true);

    for (let i = 0; i < this.policies.length; i++) {
      const { subject, object, action } = this.policies[i];

      await this.savePolicy(subject, object, action);
    }

    for (let i = 0; i < this.groupingPolicies.length; i++) {
      const { parent, child } = this.groupingPolicies[i];
      await this.saveGroupingPolicy(parent, child);
    }
    this.logger.info("Initialized with policy manager");
  };

  // Adds a policy to the casbin policy manager
  // Note: initialize saves the policies to the database
  addPolicy = (subject: string, object: string, action: string) => {
    this.policies.push({ subject, object, action });
  };

  // Save the policies to the database
  savePolicy = async (subject: string, object: string, action: string) => {
    if (!this.enforcer) throw new Error("Enforcer not available");

    return await this.enforcer.addPolicy(subject, object, action);
  };

  // Adds a grouping policy to casbin policy manager
  addGroupingPolicy = (parent: string, child: string) => {
    this.groupingPolicies.push({ parent, child });
  };

  // Saves the grouping policy to database
  saveGroupingPolicy = async (parent: string, child: string) => {
    if (!this.enforcer) throw new Error("Enforcer not available");

    await this.enforcer.addGroupingPolicy(parent, child);
  };

  // Add permission for user on a specific resource
  saveRoleForUser = async (userId: string, roleId: string) => {
    if (!this.enforcer) throw new Error("Enforcer not available");

    return await this.enforcer.addRoleForUser(userId, roleId);
  };

  // Enforce permission for user
  enforce = (userId: string, resourceId: string, actionId: A) => {
    if (!this.enforcer) throw new Error("Enforcer not available");

    return this.enforcer.enforceSync(userId, resourceId, actionId);
  };
}
