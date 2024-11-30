import type { ICreateFlatSharing, IFlatSharing } from "~/types/flatSharing";
import prisma from "~/server/database";
import { NotFoundError } from "~/types/generics/errors";

export async function create(userUid: string, payload: ICreateFlatSharing): Promise<IFlatSharing> {
  return await prisma.flatSharing.create({
    data: {
      ...payload,
      members: {
        create: [
          {
            userUid,
          },
        ],
      },
    },
    include: {
      address: true,
      members: true,
      invitations: true,
    },
  }) as IFlatSharing;
}

export async function get(uid: string): Promise<IFlatSharing> {
  const flatSharing = await prisma.flatSharing.findFirst({
    where: {
      members: {
        some: {
          userUid: uid,
        },
      },
    },
    include: {
      address: true,
      members: true,
      invitations: true,
    },
  });
  if (!flatSharing) throw new NotFoundError();
  return flatSharing as IFlatSharing;
}
