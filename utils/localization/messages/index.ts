import { Locale } from "../locale";
import en from "./en";

export type Messages = typeof en;
export type MessageId = keyof Messages;

const mapLocaleToMessages: { [locale in Locale]: Messages } = {
  en,
};

export const getMessagesByLocale = (locale: Locale): Messages =>
  mapLocaleToMessages[locale];
