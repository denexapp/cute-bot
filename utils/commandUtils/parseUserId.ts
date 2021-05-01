import parseNumberSafe from "../parseNumberSafe";
import vk from "../vk";

const originalIdPrefix = "id";
const originalLinkPrefix = "[";
const originalLinkSeparator = "|@";
const originalLinkPostfix = "]";
const originalScreenNamePrefix = "@";

const parseUserNumericalId = (text: string): number | null => {
  const id = text.slice(originalIdPrefix.length);
  const parsedNumber = parseNumberSafe(id);
  if (parsedNumber.error) return null;
  const { value } = parsedNumber;
  if (value < 1) return null;
  return value;
};

const parseUserId = async (text: string): Promise<number | null> => {
  const idPrefix = text.slice(0, originalIdPrefix.length);

  if (idPrefix === originalIdPrefix) {
    return parseUserNumericalId(text);
  }

  const linkPrefix = text.slice(0, originalLinkPrefix.length);
  const linkPostfix = text.slice(-originalLinkPostfix.length);

  if (
    linkPrefix === originalLinkPrefix &&
    linkPostfix === originalLinkPostfix
  ) {
    const trimmedLink = text.slice(
      originalLinkPrefix.length,
      -originalLinkPostfix.length
    );
    const splittedLink = trimmedLink.split(originalLinkSeparator);
    if (splittedLink.length !== 2) return null;
    const [userNumericalId] = splittedLink;
    return parseUserNumericalId(userNumericalId);
  }

  const screenNamePrefix = text.slice(0, originalScreenNamePrefix.length);

  if (originalScreenNamePrefix === screenNamePrefix) {
    const screenName = text.slice(screenNamePrefix.length);
    const result = await vk.utilsResolveScreenName(screenName);
    if (result instanceof Array) return null;
    if (result.type !== "user") return null;
    return result.object_id;
  }

  return null;
};

export default parseUserId;
