import type { ICreatePostalAddress, IPostalAddress } from "~/types/postalAddress";
import prisma from "~/server/database";
import { NotFoundError } from "~/types/generics/errors";

export async function create(payload: ICreatePostalAddress): Promise<IPostalAddress> {
  return await prisma.postalAddress.create({
    data: payload,
  }) as IPostalAddress;
}

export async function get(id: number): Promise<IPostalAddress> {
  const address = await prisma.postalAddress.findUnique({
    where: {
      id,
    },
  });
  if (!address) throw new NotFoundError();
  return address as IPostalAddress;
}
export async function getByInfo(payload: ICreatePostalAddress): Promise<IPostalAddress> {
  const address = await prisma.postalAddress.findFirst({
    where: {
      street: payload.street,
      additional: payload.additional,
      zipCode: payload.zipCode,
      city: payload.city,
      country: payload.country,
    },
  });
  if (!address) throw new NotFoundError();
  return address as IPostalAddress;
}
