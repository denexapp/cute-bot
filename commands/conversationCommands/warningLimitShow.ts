import { ConversationCommand, ConversationCommandObject } from "..";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: ConversationCommand = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
) => {
  const { peer_id: peerId } = message;
  const { warningsLimit } = settings;

  await vk.messagesSend(
    peerId,
    phrase("warningLimitShow_message", {
      warningsLimit,
    })
  );
};

const warningLimitShow: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: "warningLimitShow_description",
};

export default warningLimitShow;
