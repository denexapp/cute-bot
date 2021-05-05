import { ConversationCommand, ConversationCommandObject } from "..";
import { maxWarningsLimit, minWarningsLimit } from "../../utils/consts";
import setChatSettings from "../../utils/database/setChatSettings";
import phrase from "../../utils/localization/phrase";
import parseNumberSafe from "../../utils/parseNumberSafe";
import vk from "../../utils/vk";

const command: ConversationCommand = async (
  message,
  settings,
  callbackServerSettings
) => {
  const { peer_id: peerId, text } = message;

  const [, warningLimitString] = text.split(" ");

  if (warningLimitString === undefined || warningLimitString.length === 0) {
    await vk.messagesSend(peerId, phrase("warningLimitSet_failNoLimit"));
    return;
  }

  const parsedNumber = await parseNumberSafe(warningLimitString);

  if (parsedNumber.error) {
    await vk.messagesSend(peerId, phrase("warningLimitSet_failIncorrectLimit"));
    return;
  }

  const limit = parsedNumber.value;

  if (limit > maxWarningsLimit) {
    await vk.messagesSend(
      peerId,
      phrase("warningLimitSet_failTooHighLimit", {
        maxWarningsLimit,
      })
    );
    return;
  }

  if (limit < minWarningsLimit) {
    await vk.messagesSend(
      peerId,
      phrase("warningLimitSet_failTooLowLimit", {
        minWarningsLimit,
      })
    );
    return;
  }

  await setChatSettings(peerId, {
    warningsLimit: limit,
  });

  await vk.messagesSend(
    peerId,
    phrase("warningLimitSet_success", {
      limit,
    })
  );
};

const warningLimitSet: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: "warningLimitSet_description",
};

export default warningLimitSet;
