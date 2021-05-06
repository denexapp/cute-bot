import { ChatSettings } from "./database/getChatSettings";
import getUserSettings from "./database/getUserSettings";

export type CallbackServerSettings = {
  callbackServerUrl: string;
  callbackSecret: string;
  callbackServerChatId: number;
  callbackServerUserId: number;
};

const getCallbackServerSettings = async (
  settings: ChatSettings
): Promise<null | CallbackServerSettings> => {
  const { callbackServerUserId, callbackServerChatId } = settings;
  if (callbackServerUserId === null || callbackServerChatId === null) {
    return null;
  }
  const { callbackSecret, callbackServerUrl } = await getUserSettings(
    callbackServerUserId
  );
  if (callbackServerUrl === null) {
    return null;
  }
  return {
    callbackServerUrl,
    callbackSecret,
    callbackServerChatId,
    callbackServerUserId,
  };
};

export default getCallbackServerSettings;
