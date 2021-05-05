import IntlMessageFormat from "intl-messageformat";
import { getLocale } from "./locale";
import messages, { MessageKey, prepareMessages } from "./messages";

const phrase = (key: MessageKey, values?: Record<string, string | number>) => {
  const locale = getLocale();
  const string = prepareMessages(messages[locale])[key];
  const message = new IntlMessageFormat(string, locale, undefined, {
    ignoreTag: true,
  });
  const result = `${message.format(values)}`;
  return result;
};

export default phrase;
