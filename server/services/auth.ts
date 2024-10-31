import argon2 from "argon2";
import type { IInternalUser } from "~/types/user";
import type { IAuthLoginBody } from "~/types/auth";
import { NotFoundError } from "~/types/errors";
import type { HttpRequest } from "~/types/http";
import { error, HttpCode } from "~/types/http";
import * as userRepository from "~/server/database/repositories/user";
import * as authRepository from "~/server/database/repositories/auth";
import { readAuthCookies, registerAuthCookies } from "~/server/services/cookies";

export async function loginUser(event: HttpRequest, payload: IAuthLoginBody) {
  try {
    const user = await userRepository.getUserByEmail<IInternalUser>(payload.email);
    if (!await argon2.verify(user.password, payload.password)) return error(event, {
      code: HttpCode.Unauthorized,
      message: "Credentials not matching!",
    });

    const session = await authRepository.create(user.uid);
    registerAuthCookies(event, { token: session.token, userUid: session.userUid });

    return user;
  }
  catch (e) {
    if (e instanceof NotFoundError) return error(event, {
      code: HttpCode.NotFound,
      message: "Credentials are not matching!",
    });
    return error(event);
  }
}
export async function recoverSessionUser(event: HttpRequest) {
  const { token, userUid } = readAuthCookies(event);
  if (!token || !userUid) return error(event, {
    code: HttpCode.BadRequest,
    message: "Session can't be found!",
  });

  if (!await authRepository.isValid(token, userUid)) return error(event, {
    code: HttpCode.Unauthorized,
    message: "Invalid session provided! Maybe expired!",
  });

  return await userRepository.getUser(userUid);
}
