import argon2 from "argon2";
import type { HttpRequest } from "~/types/generics/http";
import { error, HttpCode } from "~/types/generics/http";
import type { ICreateUserBody } from "~/types/user";
import * as userRepository from "~/server/database/repositories/user";
import * as verificationCodeRepository from "~/server/database/repositories/verificationCode";
import * as mailService from "~/server/services/mail";
import { DatabaseConflictError } from "~/types/generics/errors";
import useUserAccountCreatedTemplate from "~/server/email/templates/auth/userAccountCreated";

export async function createUserAccount(event: HttpRequest, payload: ICreateUserBody) {
  try {
    const user = await userRepository.create({
      ...payload,
      password: await argon2.hash(payload.password),
    });
    const code = await verificationCodeRepository.create(user.uid);

    mailService.send({
      to: user.email,
      template: useUserAccountCreatedTemplate(code.code),
    }).catch(console.error);

    return user;
  }
  catch (e) {
    if (e instanceof DatabaseConflictError) return error(event, { code: HttpCode.Conflict, message: "Email already in use!" });
    return error(event);
  }
}
