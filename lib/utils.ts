import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { InternalizationTool } from "~/types/generics/frontSpecific";

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

const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
export function formatDate(t: InternalizationTool, date: Date) {
  const dayIndex = date.getDay();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${t(`labels.dates.days.${weekDays[dayIndex]}`).substring(0, 3)}. ${day} ${t(`labels.dates.months.${month}`)} ${year}`;
}
