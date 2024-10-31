import type { SubscriptionPlan } from "~/types/enums";

export interface IInternalUser {
  uid: string;
  email: string;
  password: string;
  verified: boolean;
  subscriptionPlan: SubscriptionPlan;
  createdAt: Date;
  updatedAt: Date;

  data?: IIncludedUserInfo;
  preferences?: IIncludedUserPreferences;
}
export type IUser = Omit<IInternalUser, "password">;

export interface IUserInfo {
  userUid: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  updatedAt: Date;
}
export type IIncludedUserInfo = Omit<IUserInfo, "userUid">;

export interface IUserPreferences {
  userUid: string;
  openToFriendRequests: boolean;
  promotionEmails: boolean;
  newMessageEmails: boolean;
  newFriendRequestEmails: boolean;
  updatedAt: Date;
}
export type IIncludedUserPreferences = Omit<IUserPreferences, "userUid">;

/* BUILD */
export interface ICreateUserBody {
  email: string;
  password: string;
  data: ICreateUserInfo;
}
export interface ICreateUserInfo {
  firstName: string;
  lastName: string;
}
