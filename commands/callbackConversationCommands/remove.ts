import {
  CallbackConversationCommand,
  CallbackConversationCommandObject,
} from "..";
import callbackRemove from "../../utils/callbackServer/remove";

const command: CallbackConversationCommand = async (
  message,
  settings,
  adminContext,
  { callbackServerUrl, callbackSecret, callbackServerChatId }
) => {
  await callbackRemove(
    callbackServerUrl,
    callbackSecret,
    callbackServerChatId,
    message.conversation_message_id
  );
};

const remove: CallbackConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: "remove_description",
};

export default remove;
