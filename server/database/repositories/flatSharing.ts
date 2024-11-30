import type {
  ICreateFlatSharing,
  ICreateFlatSharingInvitation,
  IFlatSharing,
  IFlatSharingInvitation,
} from "~/types/flatSharing";
import prisma from "~/server/database";
import { NotFoundError } from "~/types/generics/errors";

const invitationDuration = 1000 * 7 * 24 * 60 * 60;

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
export async function createInvite(payload: ICreateFlatSharingInvitation): Promise<IFlatSharingInvitation> {
  return await prisma.flatSharingInvitation.create({
    data: {
      ...payload,
      expiresAt: new Date(Date.now() + invitationDuration),
    },
  }) as IFlatSharingInvitation;
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

export async function isIn(memberUid: string, uid: string): Promise<boolean> {
  return !!await prisma.flatSharingMember.findUnique({
    where: {
      userUid_flatSharingUid: {
        userUid: memberUid,
        flatSharingUid: uid,
      },
    },
  });
}
