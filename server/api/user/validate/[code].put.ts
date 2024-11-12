import { verifyUserAccount } from "~/server/services/user";
import { useProtectedRoute } from "~/server/services/auth";

export default defineEventHandler(async event =>
  await useProtectedRoute(
    event,
    async (userUid: string) => await verifyUserAccount(event, userUid),
    {
      verified: false,
    },
  ));
