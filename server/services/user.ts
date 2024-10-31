import argon2 from "argon2";
import type { HttpRequest } from "~/types/http";
import { error, HttpCode } from "~/types/http";
import type { ICreateUserBody } from "~/types/user";
import * as userRepository from "~/server/database/repositories/user";
import * as verificationCodeRepository from "~/server/database/repositories/verificationCode";
import { DatabaseConflictError } from "~/types/errors";

export async function createUserAccount(event: HttpRequest, payload: ICreateUserBody) {
  try {
    const user = await userRepository.create({
      ...payload,
      password: await argon2.hash(payload.password),
    });
    const code = await verificationCodeRepository.create(user.uid);

    console.log(code.code);
    // todo: send mail

    return user;
  }
  catch (e) {
    if (e instanceof DatabaseConflictError) return error(event, { code: HttpCode.Conflict, message: "Email already in use!" });
    return error(event);
  }
}
