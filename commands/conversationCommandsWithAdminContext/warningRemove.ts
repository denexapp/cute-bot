import { Sex } from "vk-ts";
import {
  ConversationCommandWithAdminContext,
  ConversationCommandWithAdminContextObject,
} from "..";
import parseUserId from "../../utils/commandUtils/parseUserId";
import decrementUserWarningCount from "../../utils/database/decrementUserWarningCount";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: ConversationCommandWithAdminContext = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
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

  const count = await decrementUserWarningCount(peerId, userId);
  const sex =
    user.sex === Sex.Female
      ? "female"
      : user.sex === Sex.Male
      ? "male"
      : "unknown";

  if (count === null) {
    await vk.messagesSend(
      peerId,
      phrase("warningRemove_faliNoWarnsAlready", {
        id: user.id,
        name: user.first_name,
      })
    );
    return;
  }

  await vk.messagesSend(
    peerId,
    phrase("warningRemove_success", {
      name: user.first_name,
      id: user.id,
      maxCount: settings.warningsLimit,
      count,
      sex,
    })
  );
};

const warningRemove: ConversationCommandWithAdminContextObject = {
  command,
  isAdminCommand: true,
  description: "warningRemove_description",
};

export default warningRemove;
