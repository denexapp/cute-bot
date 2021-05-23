import { ConversationCommand, ConversationCommandObject } from "..";
import generateVkUserLink from "../../utils/generateVkUserLink";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: ConversationCommand = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
) => {
  const { peer_id: peerId, text, from_id: fromId } = message;

  if (settings.actionlessModes.welcome === null) {
    await vk.messagesSend(peerId, phrase("welcomeTest_failModeIsDisabled"));
    return;
  }

  const userLink = generateVkUserLink(
    fromId,
    adminContext?.profiles.get(fromId)?.first_name
  );

  const welcomeMessage =
    settings.welcome ?? phrase("common_defaultWelcomeMessage");

  await vk.messagesSend(
    peerId,
    phrase("common_welcome", {
      userLink,
      welcomeMessage,
    })
  );
};

const welcomeTest: ConversationCommandObject = {
  command,
  isAdminCommand: false,
  description: "welcomeTest_description",
};

export default welcomeTest;
