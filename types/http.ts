import type { H3Event } from "h3";

export const error = (event: HttpRequest, body?: { code?: HttpCode; message?: string }) => sendError(event, createError({
  statusCode: body?.code ?? HttpCode.ServerError,
  statusMessage: body?.message ?? "An internal error occured!",
}));

export type HttpRequest = H3Event<Request>;
export enum HttpCode {
  // 200
  Ok = 200,
  Created = 201,
  Accepted = 202,
  // 400
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  // 500
  ServerError = 500,
}
