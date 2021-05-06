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

  if (Object.keys(settings.templates).length === 0) {
    await vk.messagesSend(peerId, phrase("templateList_failNoTemplates"));
    return;
  }

  const templates = Object.keys(settings.templates).map((name) =>
    phrase("templateList_template", {
      name,
    })
  );

  const text = [phrase("templateList_header"), ...templates].join("\n");

  await vk.messagesSend(peerId, text);
};

const templateList: ConversationCommandObject = {
  command,
  isAdminCommand: false,
  description: "templateList_description",
};

export default templateList;
