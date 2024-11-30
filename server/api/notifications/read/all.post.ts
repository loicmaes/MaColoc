import { useProtectedRoute } from "~/server/services/auth";
import { readAllNotifications } from "~/server/services/notification";

export default defineEventHandler(async event =>
  await useProtectedRoute(event, async (userUid: string) =>
    await readAllNotifications(event, userUid)));
