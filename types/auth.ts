export interface IAuthSession {
  token: string;
  userUid: string;
  revoked: boolean;
  issuedAt: Date;
  expiresAt: Date;
}
