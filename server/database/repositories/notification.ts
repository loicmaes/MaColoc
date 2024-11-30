import prisma from "~/server/database";
import type {
  IEmailNotification,
  IPushNotification,
  ICompleteNotification,
  ICreateCompleteNotification,
  ICreateEmailNotification,
  ICreatePushNotification,
} from "~/types/notification";

export async function registerEmail(payload: ICreateEmailNotification, userUid?: string): Promise<IEmailNotification> {
  return await prisma.notification.create({
    data: {
      ...payload,
      userUid,
    },
  }) as IEmailNotification;
}
export async function registerPush(payload: ICreatePushNotification, userUid?: string): Promise<IPushNotification> {
  return await prisma.notification.create({
    data: {
      ...payload,
      userUid,
    },
  }) as IPushNotification;
}
export async function registerComplete(payload: ICreateCompleteNotification, userUid?: string): Promise<ICompleteNotification> {
  return await prisma.notification.create({
    data: {
      ...payload,
      userUid,
    },
  }) as ICompleteNotification;
}
