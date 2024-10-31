import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import type { ICreateUserBody, IUser } from "~/types/user";
import prisma from "~/server/database";
import { DatabaseConflictError, NotFoundError } from "~/types/generics/errors";

export async function getUser(uid: string): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: {
      uid,
    },
    include: {
      data: true,
      preferences: true,
    },
  });
  if (!user) throw new NotFoundError();
  return user as IUser;
}
export async function getUserByEmail<T>(email: string): Promise<T> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      data: true,
      preferences: true,
    },
  });
  if (!user) throw new NotFoundError();
  return user as T;
}

export async function create(payload: ICreateUserBody): Promise<IUser> {
  try {
    return await prisma.user.create({
      data: {
        ...payload,
        data: {
          create: {
            ...payload.data,
          },
        },
        preferences: {
          create: {
            ...payload.preferences,
          },
        },
      },
      include: {
        data: true,
        preferences: true,
      },
    }) as IUser;
  }
  catch (e) {
    if (!(e instanceof PrismaClientKnownRequestError)) throw e;
    switch ((e as PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new DatabaseConflictError();
      default:
        throw e;
    }
  }
}
