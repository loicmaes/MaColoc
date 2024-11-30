import type {
  ICreateCompleteNotification,
  ICreateEmailNotification,
  ICreateNotification,
  ICreatePushNotification,
} from "~/types/notification";
import * as notificationRepository from "~/server/database/repositories/notification";

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
