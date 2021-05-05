import { PrivateMessageCommand, PrivateMessageCommandObject } from "..";
import getUserSettings from "../../utils/database/getUserSettings";
import removeUserCallbackServer from "../../utils/database/removeUserCallbackServer";
import getEnabledCallbackModesNames from "../../utils/getEnabledCallbackModesNames";
import list from "../../utils/localization/list";
import phrase from "../../utils/localization/phrase";
import parseNumber from "../../utils/parseNumber";
import vk from "../../utils/vk";

const command: PrivateMessageCommand = async (message) => {
  const { peer_id: peerId, from_id: userId } = message;

  const { callbackServerUrl } = await getUserSettings(userId);

  if (callbackServerUrl === null) {
    await vk.messagesSend(peerId, phrase("callbackRemove_notExist"));
    return;
  }

  const settingsOfAffectedChatsBeforeChange = await removeUserCallbackServer(
    userId
  );

  await vk.messagesSend(peerId, phrase("callbackRemove_message"));

  for (const entity of settingsOfAffectedChatsBeforeChange) {
    const enabledCallbackModesNames = getEnabledCallbackModesNames(entity.data);
    const modesNames = list(enabledCallbackModesNames);
    const modesCount = enabledCallbackModesNames.length;
    const text = phrase("callbackRemove_chatMessage", {
      modesNames,
      modesCount,
    });
    await vk.messagesSend(parseNumber(entity.ref.id), text);
  }
};

const callbackRemove: PrivateMessageCommandObject = {
  command,
  description: "callbackRemove_description",
};

export default callbackRemove;
