import { useProtectedRoute } from "~/server/services/auth";
import { sendInvite } from "~/server/services/flatSharing";

export default defineEventHandler(async event =>
  await useProtectedRoute(event, async userUid =>
    await sendInvite(event, userUid, (await readBody<{ email: string }>(event)).email)));
