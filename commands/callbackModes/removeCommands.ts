import { CallbackMode, CallbackModeObject } from "..";
import remove from "../../utils/callbackServer/remove";

const action: CallbackMode = async (
  message,
  settings,
  { callbackSecret, callbackServerChatId, callbackServerUrl },
  botReacted,
  adminContext
) => {
  const { conversation_message_id } = message;

  if (botReacted) {
    await remove(
      callbackServerUrl,
      callbackSecret,
      callbackServerChatId,
      conversation_message_id
    );
  }
};

const removeCommands: CallbackModeObject = {
  description: "removeCommands_description",
  enabledText: "removeCommands_enabledText",
  disabledText: "removeCommands_disabledText",
  actionNeedsBotAdminRights: false,
  action,
};

export default removeCommands;
