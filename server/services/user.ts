import argon2 from "argon2";
import type { HttpRequest } from "~/types/generics/http";
import { error, HttpCode } from "~/types/generics/http";
import type { ICreateUserBody } from "~/types/user";
import * as userRepository from "~/server/database/repositories/user";
import * as verificationCodeRepository from "~/server/database/repositories/verificationCode";
import * as authRepository from "~/server/database/repositories/auth";
import * as mailService from "~/server/services/mail";
import { DatabaseConflictError, NotFoundError } from "~/types/generics/errors";
import useUserAccountCreatedTemplate from "~/server/email/templates/auth/userAccountCreated";
import useUserAccountVerifiedTemplate from "~/server/email/templates/auth/userAccountVerified";
import { registerAuthCookies } from "~/server/services/cookies";

export async function createUserAccount(event: HttpRequest, payload: ICreateUserBody) {
  try {
    const user = await userRepository.create({
      ...payload,
      password: await argon2.hash(payload.password),
    });
    const code = await verificationCodeRepository.create(user.uid);
    const session = await authRepository.create(user.uid);
    registerAuthCookies(event, { token: session.token, userUid: session.userUid });

    mailService.send({
      to: user.email,
      template: await useUserAccountCreatedTemplate(code.code),
    }, {
      notify: user.uid,
    }).catch(console.error);

    return user;
  }
  catch (e) {
    if (e instanceof DatabaseConflictError) return error(event, { code: HttpCode.Conflict, message: "Email already in use!" });
    return error(event);
  }
}
export async function verifyUserAccount(event: HttpRequest, userUid: string) {
  try {
    const code = getRouterParam(event, "code");

    if (!code) return error(event, {
      code: HttpCode.BadRequest,
      message: "Verification code is missing!",
    });

    if (!await verificationCodeRepository.isValid(userUid, code)) return error(event, {
      code: HttpCode.Unauthorized,
      message: "Invalid verification provided, maybe expired!",
    });

    await verificationCodeRepository.use(userUid, code);
    const user = await userRepository.verify(userUid);

    mailService.send({
      to: user.email,
      template: await useUserAccountVerifiedTemplate(),
    }, {
      notify: user.uid,
    }).catch(console.error);

    return user;
  }
  catch (e) {
    if (e instanceof NotFoundError) return error(event, {
      code: HttpCode.NotFound,
      message: "User or verification code not found!",
    });
    return error(event);
  }
}
