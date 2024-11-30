import { useProtectedRoute } from "~/server/services/auth";
import { createFlatSharing } from "~/server/services/flatSharing";
import type { ICreateRichFlatSharing } from "~/types/flatSharing";

export default defineEventHandler(async event =>
  await useProtectedRoute(event, async userUid =>
    await createFlatSharing(event, userUid, await readBody<ICreateRichFlatSharing>(event))));
