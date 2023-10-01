export interface UserDetailsInput {
  userId: string;
  email: string;
  displayName?: string;
  isEmailVerified: boolean;
  createdAt: Date;
  photoUrl?: string;
  description?: string;
  defaultWorkspaceId?: string;
}

export class UserDetails {
  public userId: string;
  public email: string;
  public displayName?: string;
  public isEmailVerified: boolean;
  public createdAt: Date;
  public photoUrl?: string;
  public description?: string;
  public defaultWorkspaceId?: string;
  constructor(inputs: UserDetailsInput) {
    this.userId = inputs.userId;
    this.email = inputs.email;
    this.displayName = inputs.displayName;
    this.isEmailVerified = inputs.isEmailVerified;
    this.createdAt = inputs.createdAt;
    this.photoUrl = inputs.photoUrl;
    this.description = inputs.description;
    this.defaultWorkspaceId = inputs.defaultWorkspaceId;
  }
}
