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

  const indexOfSpace = text.indexOf(" ");

  if (indexOfSpace === -1) {
    await vk.messagesSend(peerId, phrase("welcomeSet_failNoMessage"));
    return;
  }

  const welcomeMessage = text.slice(indexOfSpace).trim();

  if (welcomeMessage.length === 0) {
    await vk.messagesSend(peerId, phrase("welcomeSet_failNoMessage"));
    return;
  }

  await setChatSettings(peerId, {
    welcome: welcomeMessage,
  });

  const replyText: MessageId =
    settings.actionlessModes.welcome === true
      ? "welcomeSet_success"
      : "welcomeSet_successWithModeHint";

  await vk.messagesSend(peerId, phrase(replyText));
};

const welcomeSet: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: "welcomeSet_description",
};

export default welcomeSet;
