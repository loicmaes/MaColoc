import prisma from "~/server/database";
import type {
  IEmailNotification,
  IPushNotification,
  ICompleteNotification,
  ICreateCompleteNotification,
  ICreateEmailNotification,
  ICreatePushNotification, INotification,
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

export async function read(id: number, userUid: string): Promise<INotification> {
  return await prisma.notification.update({
    where: {
      id,
      userUid,
    },
    data: {
      readAt: new Date(),
    },
  }) as INotification;
}
export async function readAll(userUid: string): Promise<INotification[]> {
  await prisma.notification.updateMany({
    where: {
      userUid,
      readAt: null,
      type: {
        in: ["push", "both"],
      },
    },
    data: {
      readAt: new Date(),
    },
  });
  return await prisma.notification.findMany({
    where: {
      userUid,
      type: {
        in: ["push", "both"],
      },
    },
  }) as INotification[];
}
