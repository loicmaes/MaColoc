import prisma from "~/server/database";
import type {
  IEmailNotification,
  IPushNotification,
  ICompleteNotification,
  ICreateCompleteNotification,
  ICreateEmailNotification,
  ICreatePushNotification,
} from "~/types/notification";

export async function registerEmail(payload: ICreateEmailNotification): Promise<IEmailNotification> {
  return await prisma.notification.create({
    data: {
      ...payload,
    },
  }) as IEmailNotification;
}
export async function registerPush(payload: ICreatePushNotification): Promise<IPushNotification> {
  return await prisma.notification.create({
    data: {
      ...payload,
    },
  }) as IPushNotification;
}
export async function registerComplete(payload: ICreateCompleteNotification): Promise<ICompleteNotification> {
  return await prisma.notification.create({
    data: {
      ...payload,
    },
  }) as ICompleteNotification;
}
