import type { H3Event } from "h3";
import type {
  ICreateCompleteNotification,
  ICreateEmailNotification,
  ICreateNotification,
  ICreatePushNotification,
} from "~/types/notification";
import * as notificationRepository from "~/server/database/repositories/notification";
import { error, HttpCode } from "~/types/generics/http";

export async function registerNotification(payload: ICreateNotification, userUid?: string) {
  switch (payload.type) {
    case "email":
      return await notificationRepository.registerEmail(payload as ICreateEmailNotification, userUid);
    case "push":
      return await notificationRepository.registerPush(payload as ICreatePushNotification, userUid);
    case "both":
      return await notificationRepository.registerComplete(payload as ICreateCompleteNotification, userUid);
    default:
      throw new Error("Unknown notification type");
  }
}

export async function readNotification(event: H3Event<Request>, notificationId: number, userUid: string) {
  try {
    return await notificationRepository.read(notificationId, userUid);
  }
  catch (e) {
    return error(event, {
      code: HttpCode.ServerError,
      message: JSON.stringify(e),
    });
  }
}

export async function readAllNotifications(event: H3Event<Request>, userUid: string) {
  try {
    return await notificationRepository.readAll(userUid);
  }
  catch (e) {
    return error(event, {
      code: HttpCode.ServerError,
      message: JSON.stringify(e),
    });
  }
}
