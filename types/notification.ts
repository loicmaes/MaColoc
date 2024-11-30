export type TNotificationType = "email" | "push" | "both";

export interface INotification {
  id: number;
  userUid: string;
  type: TNotificationType;
  emittedAt: Date;
}
export interface IEmailNotification extends INotification {
  type: "email";
  template: string;
  subject: string;
  data?: string;
}
export interface IPushNotification extends INotification {
  type: "push";
  title: string;
  caption: string;
  link?: string;
  thumbnail?: string;
  readAt?: Date;
}
export interface ICompleteNotification extends INotification {
  type: "both";
  template: string;
  subject: string;
  data?: string;
  title: string;
  caption: string;
  link?: string;
  thumbnail?: string;
  readAt?: Date;
}

export type ICreateEmailNotification = Omit<Omit<Omit<IEmailNotification, "emittedAt">, "id">, "userUid">;
export type ICreatePushNotification = Omit<Omit<Omit<IPushNotification, "emittedAt">, "id">, "userUid">;
export type ICreateCompleteNotification = Omit<Omit<Omit<ICompleteNotification, "emittedAt">, "id">, "userUid">;
export type ICreateNotification = ICreateEmailNotification | ICreatePushNotification | ICreateCompleteNotification;
