import { randomString } from "~/lib/utils";
import prisma from "~/server/database";
import type { IVerificationCode } from "~/types/accountVerification";
import { NotFoundError } from "~/types/generics/errors";

const codeDuration = 15 * 60 * 1000;

export async function create(userUid: string): Promise<IVerificationCode> {
  const now = Date.now();
  const code = await prisma.verificationCode.create({
    data: {
      code: randomString(),
      user: {
        connect: {
          uid: userUid,
        },
      },
      expiresAt: new Date(now + codeDuration),
    },
  });
  return {
    ...code,
    usedAt: undefined,
  };
}

export async function isValid(userUid: string, strCode: string): Promise<boolean> {
  return !!await prisma.verificationCode.findUnique({
    where: {
      userUid_code: {
        userUid,
        code: strCode,
      },
      expiresAt: {
        gt: new Date(),
      },
      usedAt: null,
    },
  });
}
export async function use(userUid: string, strCode: string): Promise<IVerificationCode> {
  const code = await prisma.verificationCode.update({
    where: {
      userUid_code: {
        userUid,
        code: strCode,
      },
      usedAt: null,
    },
    data: {
      usedAt: new Date(),
    },
  });
  if (!code) throw new NotFoundError();
  return {
    ...code,
    usedAt: code.usedAt ?? undefined,
  };
}
