import { createUserAccount } from "~/server/services/user";
import type { ICreateUserBody } from "~/types/user";

export default defineEventHandler(async event =>
  await createUserAccount(event, await readBody<ICreateUserBody>(event)));
