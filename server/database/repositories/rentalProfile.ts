import type { ICreateRentalProfile, IIncludedRentalProfile, IRentalProfile } from "~/types/rentalProfile";
import prisma from "~/server/database";

export async function create(userUid: string, payload: ICreateRentalProfile): Promise<IIncludedRentalProfile> {
  const profile = await prisma.rentalProfile.create({
    data: {
      userUid,
      ...payload,
    },
  });

  const _profile = { ...profile } as unknown as Partial<IRentalProfile>;
  delete _profile.userUid;
  return _profile as IIncludedRentalProfile;
}
