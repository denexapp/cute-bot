import { PrivateMessageCommand, PrivateMessageCommandObject } from "..";
import add from "../../utils/callbackServer/add";
import getUserSettings from "../../utils/database/getUserSettings";
import setUserSettings from "../../utils/database/setUserSettings";
import phrase from "../../utils/localization/phrase";
import isUrlValidAndHttps from "../../utils/validateString";
import vk from "../../utils/vk";

const command: PrivateMessageCommand = async (message) => {
  const { peer_id: peerId, from_id: userId, text } = message;

  const { callbackSecret, callbackServerUrl } = await getUserSettings(userId);

  if (callbackServerUrl !== null) {
    const response = phrase("callbackAdd_failAlreadyExist", {
      callbackServerUrl,
    });
    await vk.messagesSend(peerId, response);
    return;
  }

  const url = text.split(" ")[1];

  if (url === undefined) {
    const response = phrase("callbackAdd_failNoUrl");
    await vk.messagesSend(peerId, response);
    return;
  }

  if (!isUrlValidAndHttps(url)) {
    const response = phrase("callbackAdd_failBadUrl", { url });
    await vk.messagesSend(peerId, response);
    return;
  }

  try {
    await add(url, callbackSecret);
  } catch {
    const response = phrase("callbackAdd_failError", { url });
    await vk.messagesSend(peerId, response);
    return;
  }

  await setUserSettings(userId, { callbackServerUrl: url });

  await vk.messagesSend(peerId, phrase("callbackAdd_success"));
};

const callbackAdd: PrivateMessageCommandObject = {
  command,
  description: "callbackAdd_description",
};

export default callbackAdd;
