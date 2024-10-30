export interface IVerificationCode {
  id: number;
  userUid: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  usedAt?: Date;
}
export type IIncludedVerificationCode = Omit<IVerificationCode, "userUid">;
