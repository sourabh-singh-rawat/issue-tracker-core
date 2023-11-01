export enum Consumers {
  UserCreatedConsumerActivity = "user-created-consumer-activity",
  UserCreatedConsumerIdentity = "user-created-consumer-identity",
  UserCreatedConsumerProject = "user-created-consumer-project",
  UserCreatedConsumerWorkspace = "user-created-consumer-workspace",
  UserCreatedConsumerIssue = "user-created-consumer-issue",
  ProjectCreatedConsumerActivity = "project-created-consumer-activity",

  UserUpdatedConsumerActivity = "user-updated-consumer-activity",
  UserUpdatedConsumerIdentity = "user-updated-consumer-identity",
  UserUpdatedConsumerWorkspace = "user-updated-consumer-workspace",
  UserUpdatedConsumerProject = "user-updated-consumer-project",
  UserUpdatedConsumerIssue = "user-updated-consumer-issue",
  ProjectUpdatedConsumerActivity = "project-updated-consumer-activity",

  WorkspaceCreatedConsumerProject = "workspace-created-consumer-project",
  WorkspaceUpdatedConsumerProject = "workspace-updated-consumer-project",

  WorkspaceInviteCreatedConsumerEmail = "workspace-invite-created-consumer-email",
}
