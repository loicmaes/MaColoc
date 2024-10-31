import type { IAuthSession } from "~/types/auth";
import prisma from "~/server/database";

const sessionDuration = 60 * 60 * 1000;
export async function create(userUid: string): Promise<IAuthSession> {
  const now = Date.now();
  return prisma.authSession.create({
    data: {
      user: {
        connect: {
          uid: userUid,
        },
      },
      expiresAt: new Date(now + sessionDuration),
    },
  });
}

export async function isValid(token: string, userUid: string): Promise<boolean> {
  return !!await prisma.authSession.findUnique({
    where: {
      token_userUid: {
        token,
        userUid,
      },
      revoked: false,
      expiresAt: {
        gt: new Date(),
      },
    },
  });
}
