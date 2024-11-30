import type { ICreatePostalAddress, IPostalAddress } from "~/types/postalAddress";
import type { IUser } from "~/types/user";

export interface IFlatSharing {
  uid: string;
  name: string;
  addressId: number;
  createdAt: Date;
  updatedAt: Date;

  address?: IPostalAddress;
  members?: IFlatSharingMember[];
  invitations?: IFlatSharingInvitation[];
}
export interface IFlatSharingInvitation {
  userUid: string;
  flatSharingUid: string;
  emittedAt: Date;
  expiresAt: Date;

  user?: IUser;
}
export interface IFlatSharingMember {
  userUid: string;
  flatSharingUid: string;
  joinedAt: Date;

  user?: IUser;
}

export interface ICreateFlatSharing {
  name: string;
  address: ICreatePostalAddress;
}
export interface ICreateFlatSharingInvitation {
  userUid: string;
  flatSharingUid: string;
}
export interface ICreateFlatSharingMember {
  userUid: string;
  flatSharingUid: string;
}
