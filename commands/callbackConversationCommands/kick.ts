import { Sex, User } from "vk-ts"
import {
  CallbackConversationCommand,
  CallbackConversationCommandObject
} from ".."
import callbackKick, { Status } from "../../utils/callbackServer/kick"
import parseUserId from "../../utils/commandUtils/parseUserId"
import removeUserWarningCount from "../../utils/database/removeUserWarningCount"
import generateVkUserLink from "../../utils/generateVkUserLink"
import phrase from "../../utils/localization/phrase"
import vk from "../../utils/vk"

const command: CallbackConversationCommand = async (
  message,
  settings,
  adminContext,
  {
    callbackServerUrl,
    callbackSecret,
    callbackServerChatId,
    callbackServerUserId,
  }
) => {
  const { peer_id: peerId, text, from_id } = message;

  const [, unparsedUserId] = text.split(" ");

  if (unparsedUserId === undefined || unparsedUserId.length === 0) {
    await vk.messagesSend(peerId, phrase("kick_failNoUserId"));
    return;
  }

  const userId = await parseUserId(unparsedUserId);

  let user: User | undefined;

  if (userId === null) {
    await vk.messagesSend(peerId, phrase("common_failIncorrectUserId"));
    return;
  }

  if (adminContext !== null) {
    user = adminContext.profiles.get(userId);
    const member = adminContext.conversationMembers.get(userId);

    if (user === undefined || member === undefined) {
      await vk.messagesSend(peerId, phrase("common_failNoUserInConversation"));
      return;
    }

    if (member.is_admin) {
      await vk.messagesSend(peerId, phrase("common_failCantKickAdmin"));
      return;
    }
  }

  const userLink = generateVkUserLink(userId, user?.first_name);
  const sex =
    user?.sex === Sex.Female
      ? "female"
      : user?.sex === Sex.Male
      ? "male"
      : "unknown";
  const modLink = generateVkUserLink(
    from_id,
    adminContext?.profiles.get(from_id)?.first_name
  );

  await vk.messagesSend(
    peerId,
    phrase("kick_willBeKicked", {
      userLink,
    })
  );

  let result: Status | null = null;

  try {
    result = (
      await callbackKick(
        callbackServerUrl,
        callbackSecret,
        callbackServerChatId - 2000000000,
        userId
      )
    ).status;
  } catch {}

  if (result === null) {
    if (callbackServerUserId === from_id) {
      await vk.messagesSend(
        peerId,
        phrase("common_kickWithYourCallbackServerFailed", {
          userLink,
          modLink,
          sex,
        })
      );
    } else {
      const callbackOwnerProfile = adminContext?.profiles.get(
        callbackServerUserId
      );
      const callbackOwnerLink = generateVkUserLink(
        callbackServerUserId,
        callbackOwnerProfile?.first_name
      );
      const callbackOwnerSex =
        callbackOwnerProfile?.sex === Sex.Female
          ? "female"
          : callbackOwnerProfile?.sex === Sex.Male
          ? "male"
          : "unknown";
      await vk.messagesSend(
        peerId,
        phrase("common_kickWithSomeonesCallbackServerFailed", {
          userLink,
          sex,
          modLink,
          callbackOwnerLink,
          callbackOwnerSex,
        })
      );
    }
  }

  if (result === Status.Kicked) {
    await removeUserWarningCount(peerId, userId);
  }

  if (result === Status.NoUserInChat) {
    await vk.messagesSend(peerId, phrase("common_failNoUserInConversation"));
  }

  if (result === Status.UserIsAnAdmin) {
    await vk.messagesSend(peerId, phrase("common_failCantKickAdmin"));
  }
};

const kick: CallbackConversationCommandObject = {
  command,
  isAdminCommand: true,
  description: "kick_description",
};

export default kick;
