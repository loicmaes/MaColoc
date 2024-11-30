import { useProtectedRoute } from "~/server/services/auth";
import { recoverFlatSharing } from "~/server/services/flatSharing";

export default defineEventHandler(async event =>
  await useProtectedRoute(event, async userUid =>
    await recoverFlatSharing(event, userUid)));
