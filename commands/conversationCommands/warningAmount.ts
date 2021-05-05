import { ConversationCommand, ConversationCommandObject } from "..";
import parseUserId from "../../utils/commandUtils/parseUserId";
import generateVkUserLink from "../../utils/generateVkUserLink";
import phrase from "../../utils/localization/phrase";
import vk from "../../utils/vk";

const command: ConversationCommand = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
) => {
  const { peer_id: peerId, text, from_id: fromId } = message;
  const [, unparsedUserId] = text.split(" ");
  const maxCount = settings.warningsLimit;

  if (unparsedUserId === undefined || unparsedUserId.length === 0) {
    const user = adminContext?.profiles.get(fromId);
    const count = settings.warnings[fromId] ?? 0;

    const userLink = generateVkUserLink(fromId, user?.first_name);

    await vk.messagesSend(
      peerId,
      phrase("warningAmount_message", {
        userLink,
        count,
        maxCount,
      })
    );
    return;
  }

  const userId = await parseUserId(unparsedUserId);

  if (adminContext === null) {
    if (userId === null) {
      await vk.messagesSend(
        peerId,
        phrase("warningAmount_failCantCheckIfUnknownUserIsAnAdmin")
      );
    } else {
      const userLink = generateVkUserLink(userId);
      await vk.messagesSend(
        peerId,
        phrase("warningAmount_failCantCheckIfUserIsAnAdmin", {
          userLink,
        })
      );
    }
    return;
  }

  if (!adminContext.isAdminMessage) {
    await vk.messagesSend(
      peerId,
      phrase("warningAmount_failCantSeeWarningsOfOtherPerson")
    );
    return;
  }

  if (userId === null) {
    await vk.messagesSend(peerId, phrase("common_failIncorrectUserId"));
    return;
  }

  const user = adminContext?.profiles.get(userId);

  if (user === undefined) {
    await vk.messagesSend(peerId, phrase("common_failNoUserInConversation"));
    return;
  }

  const count = settings.warnings[userId] ?? 0;
  const userLink = generateVkUserLink(user.id, user.first_name);

  await vk.messagesSend(
    peerId,
    phrase("warningAmount_messageOtherPerson", {
      userLink,
      count,
      maxCount,
    })
  );
};

const warningAmount: ConversationCommandObject = {
  command,
  isAdminCommand: false,
  description: "warningAmount_description",
};

export default warningAmount;
