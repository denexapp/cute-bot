import { ConversationCommand, ConversationCommandObject } from "..";
import parseUserId from "../../utils/commandUtils/parseUserId";
import incrementUserWarningCount from "../../utils/database/incrementUserWarningCount";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: ConversationCommand = async (message, settings) => {
  const { peer_id: peerId, text } = message;

  const [, unparsedUserId] = text.split(" ");

  if (unparsedUserId === undefined || unparsedUserId.length === 0) {
    await vk.messagesSend(peerId, phrase("templateAdd_failNoNameOrText"));
    return;
  }

  const userId = await parseUserId(unparsedUserId);

  if (userId === null) {
    await vk.messagesSend(peerId, phrase("templateAdd_failNoNameOrText"));
    return;
  }

  const count = await incrementUserWarningCount(peerId, userId);

  await vk.messagesSend(peerId, phrase("warn_success", { count }));
};

const warn: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: "warn_description",
};

export default warn;
