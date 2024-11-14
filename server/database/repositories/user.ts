import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import type { ICreateUserBody, IInternalUser, IUser } from "~/types/user";
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
      rentalProfile: true,
    },
  });
  if (!user) throw new NotFoundError();

  const _user = { ...user } as unknown as Partial<IInternalUser>;
  delete _user.password;
  return _user as IUser;
}
export async function getUserByEmail<T>(email: string): Promise<T> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      data: true,
      preferences: true,
      rentalProfile: true,
    },
  });
  if (!user) throw new NotFoundError();

  return user as T;
}

export async function isVerified(uid: string): Promise<boolean> {
  return !!await prisma.user.findUnique({
    where: {
      uid,
      verified: true,
    },
  });
}

export async function create(payload: ICreateUserBody): Promise<IUser> {
  try {
    const user = await prisma.user.create({
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
        rentalProfile: true,
      },
    });
    const _user = { ...user } as unknown as Partial<IInternalUser>;
    delete _user.password;
    return _user as IUser;
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

export async function verify(uid: string): Promise<IUser> {
  const user = await prisma.user.update({
    where: {
      uid,
    },
    data: {
      verified: true,
    },
    include: {
      data: true,
      preferences: true,
      rentalProfile: true,
    },
  });
  const _user = { ...user } as unknown as Partial<IInternalUser>;

  delete _user.password;
  return _user as IUser;
}
