import { ConversationCommand, ConversationCommandObject } from "..";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: ConversationCommand = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
) => {
  const { peer_id: peerId, text } = message;

  const [commandName, templateName] = text.split(" ");

  if (Object.keys(settings.templates).length === 0) {
    await vk.messagesSend(peerId, phrase("templateShow_failNoTemplates"));
    return;
  }

  if (templateName === undefined || templateName.length === 0) {
    await vk.messagesSend(peerId, phrase("templateShow_failNoName"));
    return;
  }

  const template = settings.templates[templateName];

  if (template === undefined || template === null) {
    await vk.messagesSend(
      peerId,
      phrase("templateShow_failNoTemplateWithThisName", {
        templateName,
      })
    );
    return;
  }

  await vk.messagesSend(peerId, template.message);
};

const templateShow: ConversationCommandObject = {
  command,
  isAdminCommand: false,
  description: "templateShow_description",
};

export default templateShow;
