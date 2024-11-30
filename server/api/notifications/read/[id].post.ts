import { useProtectedRoute } from "~/server/services/auth";
import { readNotification } from "~/server/services/notification";

export default defineEventHandler(async event =>
  await useProtectedRoute(event, async (userUid: string) =>
    await readNotification(event, parseInt(getRouterParam(event, "id") as string), userUid)));
