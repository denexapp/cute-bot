import { CallbackMode, CallbackModeObject } from "..";
import remove from "../../utils/callbackServer/remove";
import { flatWords } from "russian-bad-words";
import incrementUserWarningCount from "../../utils/database/incrementUserWarningCount";
import { Sex } from "vk-ts";
import generateVkUserLink from "../../utils/generateVkUserLink";
import kick, { Status } from "../../utils/callbackServer/kick";
import removeUserWarningCount from "../../utils/database/removeUserWarningCount";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const action: CallbackMode = async (
  message,
  settings,
  {
    callbackSecret,
    callbackServerChatId,
    callbackServerUrl,
    callbackServerUserId,
  },
  botReacted,
  adminContext
) => {
  const {
    conversation_message_id: conversationMessageId,
    peer_id: peerId,
    from_id: fromId,
  } = message;

  if (adminContext?.isAdminMessage) {
    return;
  }

  const normalizeWord = (word: string) =>
    word.replace("ё", "е").replace("й", "и").replace("ъ", "ь");
  const normalizeWordWithCase = (word: string) =>
    normalizeWord(word).toLocaleLowerCase("ru");

  const swearWordsSet = new Set(flatWords.map(normalizeWord));

  const words = normalizeWordWithCase(message.text).match(
    /[абвгдежзиклмнопрстуфхцчшщыьэюя]+/g
  );

  if (words === null) return;

  let swearWord: string | undefined;

  for (const word of words) {
    if (swearWordsSet.has(word)) {
      await remove(
        callbackServerUrl,
        callbackSecret,
        callbackServerChatId,
        conversationMessageId
      );

      swearWord = word;

      break;
    }
  }

  if (swearWord === undefined) return;

  const user = adminContext?.profiles.get(fromId);
  const count = await incrementUserWarningCount(peerId, fromId);
  const maxCount = settings.warningsLimit;
  const sex =
    user?.sex === Sex.Female
      ? "female"
      : user?.sex === Sex.Male
      ? "male"
      : "unknown";
  const userLink = generateVkUserLink(fromId, user?.first_name);

  if (count >= settings.warningsLimit) {
    await vk.messagesSend(
      peerId,
      phrase("profanityFilter_willBeKickedWithCallback", {
        userLink,
        maxCount,
        word: swearWord,
      })
    );

    let result: Status | null = null;

    try {
      result = (
        await kick(
          callbackServerUrl,
          callbackSecret,
          callbackServerChatId - 2000000000,
          fromId
        )
      ).status;
    } catch {}

    if (result === null) {
      const callbackOwnerProfile =
        adminContext?.profiles.get(callbackServerUserId);
      const callbackOwnerLink = generateVkUserLink(
        callbackServerUserId,
        callbackOwnerProfile?.first_name
      );
      const callbackOwnerSex =
        callbackOwnerProfile?.sex === Sex.Female
          ? "female"
          : callbackOwnerProfile?.sex === Sex.Male
          ? "male"
          : "unknown";
      await vk.messagesSend(
        peerId,
        phrase("common_kickWithCallbackServerFailed", {
          userLink,
          sex,
          callbackOwnerLink,
          callbackOwnerSex,
        })
      );
    }

    if (result === Status.Kicked) {
      await removeUserWarningCount(peerId, fromId);
    }
  } else {
    await vk.messagesSend(
      peerId,
      phrase("profanityFilter_success", {
        userLink,
        count,
        maxCount,
        word: swearWord,
      })
    );
  }
};

const profanityFilter: CallbackModeObject = {
  description: "profanityFilter_description",
  enabledText: "profanityFilter_enabledText",
  disabledText: "profanityFilter_disabledText",
  actionNeedsBotAdminRights: false,
  action,
};

export default profanityFilter;
