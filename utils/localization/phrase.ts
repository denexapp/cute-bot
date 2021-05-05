import IntlMessageFormat from "intl-messageformat";
import { getLocale } from "./locale";
import { getMessagesByLocale, MessageId } from "./messages";

const phrase = (key: MessageId, values?: Record<string, string | number>) => {
  const locale = getLocale();
  const string = getMessagesByLocale(locale)[key];
  const message = new IntlMessageFormat(string, locale, undefined, {
    ignoreTag: true,
  });
  const result = `${message.format(values)}`;
  return result;
};

export default phrase;
