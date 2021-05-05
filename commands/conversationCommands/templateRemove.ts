import { ConversationCommand, ConversationCommandObject } from "..";
import removeChatTemplateMessage from "../../utils/database/removeChatTemplateMessage";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

// the syntax is wrong
// theres no saved templates
// theres no template with this name

const command: ConversationCommand = async (
  message,
  settings,
  callbackServerSettings
) => {
  const { peer_id: peerId, text } = message;

  const [commandName, templateName] = text.split(" ");

  if (templateName === undefined || templateName.length === 0) {
    await vk.messagesSend(peerId, phrase("templateRemove_failNoName"));
    return;
  }

  const resultStatus = await removeChatTemplateMessage(peerId, templateName);

  if (resultStatus === -1) {
    await vk.messagesSend(peerId, phrase("templateRemove_failNoTemplates"));
    return;
  }

  if (resultStatus === -2) {
    await vk.messagesSend(
      peerId,
      phrase("templateRemove_failNoTemplateWithThisName", {
        templateName,
      })
    );
    return;
  }

  if (resultStatus === 0) {
    await vk.messagesSend(
      peerId,
      phrase("templateRemove_success", {
        templateName,
      })
    );
    return;
  }
};

const templateRemove: ConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: "templateRemove_description",
};

export default templateRemove;
