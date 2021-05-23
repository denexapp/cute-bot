import { ConversationCommand, ConversationCommandObject } from "..";
import setChatSettings from "../../utils/database/setChatSettings";
import { MessageId } from "../../utils/localization/messages";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: ConversationCommand = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
) => {
  const { peer_id: peerId, text } = message;

  if (settings.welcome === null) {
    const replyText: MessageId =
      settings.actionlessModes.welcome === true
        ? "welcomeRemove_failNoMessageWithModeHint"
        : "welcomeRemove_failNoMessage";

    await vk.messagesSend(peerId, phrase(replyText));
    return;
  }

  await setChatSettings(peerId, {
    welcome: null,
  });

  const replyText: MessageId =
    settings.actionlessModes.welcome === true
      ? "welcomeRemove_successWithModeHint"
      : "welcomeRemove_success";

  await vk.messagesSend(peerId, phrase(replyText));
};

const welcomeRemove: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: "welcomeRemove_description",
};

export default welcomeRemove;
