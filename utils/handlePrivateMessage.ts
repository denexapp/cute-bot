import {
  privateMessageCommands,
  callbackConversationCommands,
  conversationCommands,
  modes,
  callbackModes,
} from "../commands";
import phrase from "./localization/phrase";
import vk from "./vk";
import { Message } from "./vkCallbackDecoders/messageNewDecoder";

const isConversationCommandWithNameExist = (name: string) =>
  [callbackConversationCommands, conversationCommands]
    .map((commands) => Object.keys(commands))
    .flat()
    .some((commandName) => commandName === name);

const isModeWithNameExist = (name: string) =>
  [callbackModes, modes]
    .map((modes) => Object.keys(modes))
    .flat()
    .some((modeName) => modeName === name);

const handlePrivateMessage = async (message: Message, commandName: string) => {
  const { peer_id: peerId } = message;
  const commandObject = privateMessageCommands[commandName];

  if (commandObject === undefined) {
    if (isConversationCommandWithNameExist(commandName)) {
      const text = phrase("common_commandAvailableInAGroupChatOnly", {
        commandName,
      });
      await vk.messagesSend(peerId, text);
      return;
    }
    if (isModeWithNameExist(commandName)) {
      const text = phrase("common_modeAvailableInAGroupChatOnly", {
        commandName,
      });
      await vk.messagesSend(peerId, text);
      return;
    }
    await vk.messagesSend(peerId, phrase("common_unknownCommand"));
    return;
  }

  await commandObject.command(message);
};

export default handlePrivateMessage;
