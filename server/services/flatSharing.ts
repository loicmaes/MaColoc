import type { H3Event } from "h3";
import type { ICreateRichFlatSharing } from "~/types/flatSharing";
import { error, HttpCode } from "~/types/generics/http";
import { connectPostalAddress } from "~/server/services/postalAddress";
import * as flatSharingRepository from "~/server/database/repositories/flatSharing";
import { NotFoundError } from "~/types/generics/errors";

export async function createFlatSharing(event: H3Event<Request>, userUid: string, payload: ICreateRichFlatSharing) {
  try {
    const address = await connectPostalAddress(payload.address);
    return await flatSharingRepository.create(userUid, {
      name: payload.name,
      addressId: address.id,
    });
  }
  catch (e) {
    return error(event, {
      code: HttpCode.ServerError,
      message: JSON.stringify(e),
    });
  }
}

export async function recoverFlatSharing(event: H3Event<Request>, uid: string) {
  try {
    return await flatSharingRepository.get(uid);
  }
  catch (e) {
    if (e instanceof NotFoundError)
      return error(event, {
        code: HttpCode.NotFound,
        message: "The target flat sharing couldn't be found!",
      });
    return error(event, {
      message: JSON.stringify(e),
    });
  }
}
