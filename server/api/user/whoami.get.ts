import { recoverSessionUser } from "~/server/services/auth";

export default defineEventHandler(async event =>
  await recoverSessionUser(event));
