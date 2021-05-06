import { Sex } from "vk-ts";
import {
  ConversationCommandWithAdminContext,
  ConversationCommandWithAdminContextObject,
} from "..";
import kick, { Status } from "../../utils/callbackServer/kick";
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
    await vk.messagesSend(peerId, phrase("warningAdd_failNoUserId"));
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

      await vk.messagesSend(
        peerId,
        phrase("warningAdd_willBeKickedWithCallback", {
          userLink,
          maxCount,
          sex,
        })
      );

      let result: Status | null = null;

      try {
        result = (
          await kick(
            callbackServerUrl,
            callbackSecret,
            callbackServerChatId - 2000000000,
            user.id
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
        await vk.messagesSend(
          peerId,
          phrase("common_failNoUserInConversation")
        );
      }

      if (result === Status.UserIsAnAdmin) {
        await vk.messagesSend(peerId, phrase("common_failCantKickAdmin"));
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
