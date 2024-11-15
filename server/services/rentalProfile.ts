import type { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import type { ICreateRentalProfile } from "~/types/rentalProfile";
import type { HttpRequest } from "~/types/generics/http";
import { error, HttpCode } from "~/types/generics/http";
import * as rentalProfileRepository from "~/server/database/repositories/rentalProfile";
import { getUser } from "~/server/database/repositories/user";

export async function registerRentalProfile(event: HttpRequest, userUid: string, payload: ICreateRentalProfile) {
  try {
    await rentalProfileRepository.create(userUid, payload);
    return await getUser(userUid);
  }
  catch (e) {
    switch ((e as PrismaClientKnownRequestError).code) {
      case "P2002":
        return error(event, {
          code: HttpCode.Conflict,
          message: "You already have a rental profile!",
        });
      default:
        return error(event);
    }
  }
}
