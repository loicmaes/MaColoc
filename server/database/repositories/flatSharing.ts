import type { ICreateFlatSharing, IFlatSharing } from "~/types/flatSharing";
import prisma from "~/server/database";
import { NotFoundError } from "~/types/generics/errors";

export async function create(userUid: string, payload: ICreateFlatSharing): Promise<IFlatSharing> {
  const flatSharing = await prisma.flatSharing.create({
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
      members: {
        include: {
          user: {
            include: {
              data: true,
            },
          },
        },
      },
      invitations: true,
    },
  });

  return {
    ...flatSharing,
    members: (flatSharing.members ?? []).map((member) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const _member = { ...member } as any;
      delete _member.user.password;
      return _member;
    }),
  } as IFlatSharing;
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
      members: {
        include: {
          user: {
            include: {
              data: true,
            },
          },
        },
      },
      invitations: true,
    },
  });
  if (!flatSharing) throw new NotFoundError();

  return {
    ...flatSharing,
    members: (flatSharing.members ?? []).map((member) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const _member = { ...member } as any;
      delete _member.user.password;
      return _member;
    }),
  } as IFlatSharing;
}
