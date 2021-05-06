import { Sex } from "vk-ts";
import {
  ConversationCommandWithAdminContext,
  ConversationCommandWithAdminContextObject,
} from "..";
import kick from "../../utils/callbackServer/kick";
import parseUserId from "../../utils/commandUtils/parseUserId";
import incrementUserWarningCount from "../../utils/database/incrementUserWarningCount";
import removeUserWarningCount from "../../utils/database/removeUserWarningCount";
import generateVkUserLink from "../../utils/generateVkUserLink";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: ConversationCommandWithAdminContext = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
) => {
  const { peer_id: peerId, text, from_id } = message;

  const [, unparsedUserId] = text.split(" ");

  if (unparsedUserId === undefined || unparsedUserId.length === 0) {
    await vk.messagesSend(peerId, phrase("common_failNoUserId"));
    return;
  }

  const userId = await parseUserId(unparsedUserId);

  if (userId === null) {
    await vk.messagesSend(peerId, phrase("common_failIncorrectUserId"));
    return;
  }

  const user = adminContext.profiles.get(userId);
  const member = adminContext.conversationMembers.get(userId);

  if (user === undefined || member === undefined) {
    await vk.messagesSend(peerId, phrase("common_failNoUserInConversation"));
    return;
  }

  if (member.is_admin) {
    await vk.messagesSend(peerId, phrase("warningAdd_failCantWarnAdmin"));
    return;
  }

  const count = await incrementUserWarningCount(peerId, userId);
  const maxCount = settings.warningsLimit;
  const sex =
    user.sex === Sex.Female
      ? "female"
      : user.sex === Sex.Male
      ? "male"
      : "unknown";
  const userLink = generateVkUserLink(user.id, user.first_name);
  const modLink = generateVkUserLink(
    from_id,
    adminContext.profiles.get(from_id)?.first_name
  );

  if (count >= settings.warningsLimit) {
    if (callbackServerSettings !== null) {
      const {
        callbackSecret,
        callbackServerChatId,
        callbackServerUrl,
        callbackServerUserId,
      } = callbackServerSettings;

      let kicked = false;

      await vk.messagesSend(
        peerId,
        phrase("warningAdd_willBeKickedWithCallback", {
          userLink,
          maxCount,
          sex,
        })
      );

      try {
        await kick(
          callbackServerUrl,
          callbackSecret,
          callbackServerChatId - 2000000000,
          user.id
        );
        kicked = true;
      } catch {
        if (callbackServerUserId === from_id) {
          await vk.messagesSend(
            peerId,
            phrase("warningAdd_kickWithYourCallbackServerFailed", {
              userLink,
              modLink,
              sex,
            })
          );
        } else {
          const callbackOwnerProfile = adminContext.profiles.get(
            callbackServerUserId
          );
          const callbackOwnerLink = generateVkUserLink(
            callbackServerUserId,
            callbackOwnerProfile?.first_name
          );
          const callbackOwnerSex =
            callbackOwnerProfile?.sex === Sex.Female
              ? "female"
              : user.sex === Sex.Male
              ? "male"
              : "unknown";
          await vk.messagesSend(
            peerId,
            phrase("warningAdd_kickWithSomeonesCallbackServerFailed", {
              userLink,
              sex,
              modLink,
              callbackOwnerLink,
              callbackOwnerSex,
            })
          );
        }
      }

      if (kicked) {
        await removeUserWarningCount(peerId, userId);
      }
    } else {
      await vk.messagesSend(
        peerId,
        phrase("warningAdd_kickManually", {
          userLink,
          modLink,
          sex,
          maxCount,
        })
      );
    }
  } else {
    await vk.messagesSend(
      peerId,
      phrase("warningAdd_success", {
        userLink,
        count,
        maxCount,
        sex,
      })
    );
  }
};

const warningAdd: ConversationCommandWithAdminContextObject = {
  command,
  isAdminCommand: true,
  description: "warningAdd_description",
};

export default warningAdd;
