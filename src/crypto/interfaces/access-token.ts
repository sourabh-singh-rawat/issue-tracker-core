import { BaseToken } from "./base-token";

export interface AccessToken extends BaseToken {
  email: string;
  workspaceId: string;
  createdAt: string;
  isEmailVerified: boolean;
  displayName?: string;
  userMetadata: { language: string };
  appMetadata: { roles: string[] };
}
