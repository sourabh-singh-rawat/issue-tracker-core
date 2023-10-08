export interface UserUpdatedPayload {
  userId: string;
  defaultWorkspaceId: string;
  version: number;
  isEmailVerified?: boolean;
}
