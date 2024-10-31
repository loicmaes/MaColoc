import type { HttpRequest } from "~/types/http";

export const k_token = "token";
export const k_user = "user";

export function registerAuthCookies(event: HttpRequest, payload: { token: string; userUid: string }) {
  const options = { path: "/", httpOnly: true, secure: false };
  setCookie(event, k_token, payload.token, options);
  setCookie(event, k_user, payload.userUid, options);
}
export function readAuthCookies(event: HttpRequest): { token: string | undefined; userUid: string | undefined } {
  const token = getCookie(event, k_token);
  const userUid = getCookie(event, k_user);

  return { token, userUid };
}
