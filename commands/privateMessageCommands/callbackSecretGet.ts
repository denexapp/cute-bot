import { PrivateMessageCommand, PrivateMessageCommandObject } from "..";
import getUserSettings from "../../utils/database/getUserSettings";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: PrivateMessageCommand = async (message) => {
  const { peer_id: peerId, from_id: userId } = message;

  const { callbackSecret } = await getUserSettings(userId);

  const text = phrase("callbackSecretGet_message", { secret: callbackSecret });

  await vk.messagesSend(peerId, text);
};

const callbackSecretGet: PrivateMessageCommandObject = {
  command,
  description: "callbackSecretGet_description",
};

export default callbackSecretGet;
