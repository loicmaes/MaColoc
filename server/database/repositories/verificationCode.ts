import { randomString } from "~/lib/utils";
import prisma from "~/server/database";
import type { IVerificationCode } from "~/types/accountVerification";

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
