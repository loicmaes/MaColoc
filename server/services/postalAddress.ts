import type { ICreatePostalAddress, IPostalAddress } from "~/types/postalAddress";
import * as postalAddressRepository from "~/server/database/repositories/postalAddress";
import { NotFoundError } from "~/types/generics/errors";

export async function connectPostalAddress(payload: ICreatePostalAddress): Promise<IPostalAddress> {
  try {
    return await postalAddressRepository.getByInfo(payload);
  }
  catch (e) {
    if (!(e instanceof NotFoundError)) throw e;
  }

  return await postalAddressRepository.create(payload);
}
