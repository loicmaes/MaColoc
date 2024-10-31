import { loginUser } from "~/server/services/auth";
import type { IAuthLoginBody } from "~/types/auth";

export default defineEventHandler(async event =>
  await loginUser(event, await readBody<IAuthLoginBody>(event)));
