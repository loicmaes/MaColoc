import { useProtectedRoute } from "~/server/services/auth";
import type { ICreateRentalProfile } from "~/types/rentalProfile";
import { registerRentalProfile } from "~/server/services/rentalProfile";

export default defineEventHandler(async event =>
  await useProtectedRoute(
    event,
    async userUid => await registerRentalProfile(event, userUid, await readBody<ICreateRentalProfile>(event)),
  ),
);
