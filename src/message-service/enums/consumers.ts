// durable consumer name
export enum Consumers {
  UserCreatedConsumerIdentity = "user-created-consumer-identity",
  UserCreatedConsumerProject = "user-created-consumer-project",
  UserCreatedConsumerWorkspace = "user-created-consumer-workspace",

  UserUpdatedConsumerIdentity = "user-updated-consumer-identity",
  UserUpdatedConsumerWorkspace = "user-updated-consumer-workspace",
  UserUpdatedConsumerProject = "user-updated-consumer-project",

  WorkspaceCreatedConsumerProject = "workspace-created-consumer-project",
  WorkspaceUpdatedConsumerProject = "workspace-updated-consumer-project",
}
