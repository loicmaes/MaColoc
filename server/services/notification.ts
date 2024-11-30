import type {
  ICreateCompleteNotification,
  ICreateEmailNotification,
  ICreateNotification,
  ICreatePushNotification,
} from "~/types/notification";
import * as notificationRepository from "~/server/database/repositories/notification";

export async function registerNotification(payload: ICreateNotification) {
  switch (payload.type) {
    case "email":
      return await notificationRepository.registerEmail(payload as ICreateEmailNotification);
    case "push":
      return await notificationRepository.registerPush(payload as ICreatePushNotification);
    case "both":
      return await notificationRepository.registerComplete(payload as ICreateCompleteNotification);
    default:
      throw new Error("Unknown notification type");
  }
}
