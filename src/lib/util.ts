import { padStart } from "lodash-es";

import { isSameDay } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export function checkNotNull<T>(check: T | null | undefined): T {
  if (check == null) {
    throw new Error();
  }
  return check;
}

export function floatHourToString(hour: number) {
  return `${Math.floor(hour)}h${padStart(
    parseInt((60 * (hour - Math.floor(hour))).toPrecision(2)).toString(),
    2,
    "0",
  )}`;
}

export function safeDate(date: string) {
  return new Date(date.replaceAll("_", "-"));
}

export function isTodayInParis(date: Date) {
  return isSameDay(utcToZonedTime(new Date(), "Europe/Paris"), date);
}
