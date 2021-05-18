import { User, VkError, VkErrorCode } from "vk-ts";
import { ConversationMember } from "vk-ts/dist/methods/messagesGetConversationMembers";
import { AdminContext } from "../commands";
import getChatSettings from "./database/getChatSettings";
import getCallbackServerSettings from "./getCallbackServerSettings";
import handleConversationMessage from "./handleConversationMessage";
import handleModes from "./handleModes";
import handlePrivateMessage from "./handlePrivateMessage";
import phrase from "./localization/phrase";
import variables from "./variables";
import vk from "./vk";
import { Message } from "./vkCallbackDecoders/messageNewDecoder";

const getCommandName = (text: string) => {
  const spaceIndex = text.indexOf(" ");
  return spaceIndex === -1 ? text.slice(1) : text.slice(1, spaceIndex);
};

const getAdminContext = async (
  peerId: number,
  fromId: number
): Promise<AdminContext | null> => {
  try {
    const { items, profiles } = await vk.messagesGetConversationMembers(peerId);
    const memberIndex = items.findIndex(
      ({ member_id }) => member_id === fromId
    );

    const isAdminMessage = memberIndex !== -1 && items[memberIndex].is_admin;

    const conversationMembers = new Map<number, ConversationMember>(
      items.map((value) => [value.member_id, value])
    );

    const profilesMap = new Map<number, User>(
      profiles.map((value) => [value.id, value])
    );

    return {
      conversationMembers,
      isAdminMessage,
      profiles: profilesMap,
    };
  } catch (error) {
    if (
      error instanceof VkError &&
      error.code === VkErrorCode.NoAccessToTheConversation
    ) {
      return null;
    }
    throw new Error("Unexpected response");
  }
};

const handleMessage = async (message: Message) => {
  const { text, peer_id: peerId, from_id: fromId, action } = message;
  const privateMessage = message.peer_id < 2000000000;
  const command = text.startsWith("/");

  if (!privateMessage) {
    const botIsInvited =
      action !== null &&
      action.type === "chat_invite_user" &&
      action.member_id === -variables.groupId;
    if (botIsInvited) {
      await vk.messagesSend(peerId, phrase("common_hello"));
    }
    if (action === null) {
      const [settings, adminContext] = await Promise.all([
        getChatSettings(peerId),
        getAdminContext(peerId, fromId),
      ]);
      const callbackServerSettings = await getCallbackServerSettings(settings);
      let botReacted = false;
      if (command) {
        botReacted = await handleConversationMessage(
          message,
          getCommandName(text),
          settings,
          callbackServerSettings,
          adminContext
        );
      }
      await handleModes(
        message,
        settings,
        callbackServerSettings,
        adminContext !== null,
        botReacted,
        adminContext
      );
    }
  } else {
    if (command) {
      await handlePrivateMessage(message, getCommandName(text));
    }
  }
};

export default handleMessage;
