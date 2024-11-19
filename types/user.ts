import type { TGender, TSubscriptionPlan } from "~/types/generics/enums";
import type { IIncludedRentalProfile } from "~/types/rentalProfile";

export interface IInternalUser {
  uid: string;
  email: string;
  password: string;
  verified: boolean;
  subscriptionPlan: TSubscriptionPlan;
  createdAt: Date;
  updatedAt: Date;

  data?: IIncludedUserInfo;
  preferences?: IIncludedUserPreferences;
  rentalProfile?: IIncludedRentalProfile;
}
export type IUser = Omit<IInternalUser, "password">;

export interface IUserInfo {
  userUid: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  birthdate?: Date;
  gender?: TGender;
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
  preferences: ICreateUserPreferences;
}
export interface ICreateUserInfo {
  firstName: string;
  lastName: string;
}
export interface ICreateUserPreferences {
  promotionEmails?: boolean;
}
