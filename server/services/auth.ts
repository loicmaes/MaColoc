import argon2 from "argon2";
import type { IInternalUser } from "~/types/user";
import type { IAuthLoginBody } from "~/types/auth";
import { NotFoundError } from "~/types/generics/errors";
import type { HttpRequest } from "~/types/generics/http";
import { error, HttpCode } from "~/types/generics/http";
import * as userRepository from "~/server/database/repositories/user";
import * as authRepository from "~/server/database/repositories/auth";
import { readAuthCookies, registerAuthCookies } from "~/server/services/cookies";
import type { IBackRouteProtection } from "~/types/generics/routeProtection";

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
// eslint-disable-next-line
export async function useProtectedRoute(event: HttpRequest, callback: (userUid: string) => Promise<any>, options: IBackRouteProtection = { verified: true }) {
  const { token, userUid } = readAuthCookies(event);
  if (!token || !userUid) return error(event, {
    code: HttpCode.Unauthorized,
    message: "No session provided!",
  });

  if (!await authRepository.isValid(token, userUid)) return error(event, {
    code: HttpCode.Unauthorized,
    message: "Your session has expired!",
  });
  if (options.verified && !await userRepository.isVerified(userUid)) return error(event, {
    code: HttpCode.Forbidden,
    message: "You're profile is not verified!",
  });
  // todo: permissions

  return await callback(userUid);
}
