import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const number = "0123456789";
type RandomStringOption = {
  length: number;
  lower?: boolean;
  upper?: boolean;
  number?: boolean;
};
export function randomString(options: RandomStringOption = { length: 6, upper: true, number: true }) {
  const modem = `${options.lower ? lower : ""}${options.upper ? upper : ""}${options.number ? number : ""}`;

  let str = "";
  for (let i = 0; i < options.length; ++i)
    str += modem[Math.floor(Math.random() * modem.length)];

  return str;
}
