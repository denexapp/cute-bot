import { Sex } from "vk-ts";
import {
  ConversationCommandWithAdminContext,
  ConversationCommandWithAdminContextObject,
} from "..";
import parseUserId from "../../utils/commandUtils/parseUserId";
import incrementUserWarningCount from "../../utils/database/incrementUserWarningCount";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: ConversationCommandWithAdminContext = async (
  message,
  settings,
  adminContext
) => {
  const { peer_id: peerId, text } = message;

  const [, unparsedUserId] = text.split(" ");

  if (unparsedUserId === undefined || unparsedUserId.length === 0) {
    await vk.messagesSend(peerId, phrase("common_failNoUserId"));
    return;
  }

  const userId = await parseUserId(unparsedUserId);

  if (userId === null) {
    await vk.messagesSend(peerId, phrase("common_failIncorrectUserId"));
    return;
  }

  const user = adminContext.profiles.get(userId);

  if (user === undefined) {
    await vk.messagesSend(peerId, phrase("common_failNoUserInConversation"));
    return;
  }

  const count = await incrementUserWarningCount(peerId, userId)

  await vk.messagesSend(
    peerId,
    phrase("warn_success", {
      count,
      sex:
        user.sex === Sex.Female
          ? "female"
          : user.sex === Sex.Male
          ? "male"
          : "unknown",
    })
  );
};

const warn: ConversationCommandWithAdminContextObject = {
  command,
  isAdminCommand: true,
  description: "warn_description",
};

export default warn;
