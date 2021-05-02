import {
  actionlessModes,
  AdminContext,
  callbackConversationCommands,
  callbackModes,
  conversationCommands,
  conversationCommandsWithAdminContext,
  modes,
  privateMessageCommands,
  upcastToActionlessModeName,
  upcastToCallbackModeName,
  upcastToModeName,
} from "../commands";
import { ChatSettings } from "./database/getChatSettings";
import setChatSettings from "./database/setChatSettings";
import { CallbackServerSettings } from "./getCallbackServerSettings";
import phrase from "./localization/phrase";
import vk from "./vk";
import { Message } from "./vkCallbackDecoders/messageNewDecoder";

const isPrivateMessageCommandWithNameExist = (name: string) =>
  Object.keys(privateMessageCommands).some(
    (commandName) => commandName === name
  );

const handleConversationMessage = async (
  message: Message,
  commandName: string,
  settings: ChatSettings,
  callbackServerSettings: CallbackServerSettings | null,
  adminContext: AdminContext | null
): Promise<boolean> => {
  const { peer_id: peerId, from_id: fromId } = message;

  if (settings.actionlessModes.ignoreUsers) {
    if (adminContext === null) {
      await vk.messagesSend(
        peerId,
        phrase("common_needPermissionsToReactToCommands")
      );
      return true;
    } else if (adminContext.isAdminMessage === false) {
      return false;
    }
  }

  if (callbackModes[commandName] !== undefined) {
    const commandObject = callbackModes[commandName];

    if (adminContext === null) {
      await vk.messagesSend(
        peerId,
        phrase("common_needPermissionsToControlModes", { commandName })
      );
      return true;
    } else if (adminContext.isAdminMessage === false) {
      await vk.messagesSend(
        peerId,
        phrase("common_modeAvailableForAdminsOnly", { commandName })
      );
      return true;
    }

    const callbackModeName = upcastToCallbackModeName(commandName);
    const newValue =
      settings.callbackModes[callbackModeName] === null ? true : null;

    if (newValue === true && callbackServerSettings === null) {
      await vk.messagesSend(
        peerId,
        phrase("common_modeRequiresCallbackServer", { commandName })
      );
      return true;
    }

    await setChatSettings(peerId, {
      callbackModes: {
        [callbackModeName]: newValue,
      },
    });

    if (newValue === true) {
      const enabledText = phrase(commandObject.enabledText);
      await vk.messagesSend(
        peerId,
        phrase("common_modeEnabled", { commandName, enabledText })
      );
    } else {
      const disabledText = phrase(commandObject.disabledText);
      await vk.messagesSend(
        peerId,
        phrase("common_modeDisabled", { commandName, disabledText })
      );
    }

    return true;
  }

  if (actionlessModes[commandName] !== undefined) {
    const commandObject = actionlessModes[commandName];

    if (adminContext === null) {
      await vk.messagesSend(
        peerId,
        phrase("common_needPermissionsToControlModes", { commandName })
      );

      return true;
    } else if (adminContext.isAdminMessage === false) {
      await vk.messagesSend(
        peerId,
        phrase("common_modeAvailableForAdminsOnly", { commandName })
      );
      return true;
    }

    const modeName = upcastToActionlessModeName(commandName);

    await setChatSettings(peerId, {
      actionlessModes: {
        [modeName]: settings.actionlessModes[modeName] === null ? true : null,
      },
    });

    if (settings.actionlessModes[modeName] === null) {
      const enabledText = phrase(commandObject.enabledText);
      await vk.messagesSend(
        peerId,
        phrase("common_modeEnabled", { commandName, enabledText })
      );
    } else {
      const disabledText = phrase(commandObject.disabledText);
      await vk.messagesSend(
        peerId,
        phrase("common_modeDisabled", { commandName, disabledText })
      );
    }

    return true;
  }

  if (modes[commandName] !== undefined) {
    const commandObject = modes[commandName];

    if (adminContext === null) {
      await vk.messagesSend(
        peerId,
        phrase("common_needPermissionsToControlModes", { commandName })
      );

      return true;
    } else if (adminContext.isAdminMessage === false) {
      await vk.messagesSend(
        peerId,
        phrase("common_modeAvailableForAdminsOnly", { commandName })
      );
      return true;
    }

    const modeName = upcastToModeName(commandName);

    await setChatSettings(peerId, {
      modes: {
        [modeName]: settings.modes[modeName] === null ? true : null,
      },
    });

    if (settings.modes[modeName] === null) {
      const enabledText = phrase(commandObject.enabledText);
      await vk.messagesSend(
        peerId,
        phrase("common_modeEnabled", { commandName, enabledText })
      );
    } else {
      const disabledText = phrase(commandObject.disabledText);
      await vk.messagesSend(
        peerId,
        phrase("common_modeDisabled", { commandName, disabledText })
      );
    }

    return true;
  }

  if (callbackConversationCommands[commandName] !== undefined) {
    const commandObject = callbackConversationCommands[commandName];

    if (
      commandObject.isAdminCommand &&
      adminContext !== null &&
      adminContext.isAdminMessage === false
    ) {
      await vk.messagesSend(
        peerId,
        phrase("common_commandAvailableForAdminsOnly", { commandName })
      );
      return true;
    }

    if (commandObject.isAdminCommand && adminContext === null) {
      await vk.messagesSend(
        peerId,
        phrase("common_needPermissionsToUseAdminCommands", { commandName })
      );
      return true;
    }

    if (callbackServerSettings === null) {
      await vk.messagesSend(
        peerId,
        phrase("common_commandRequiresCallbackServer", { commandName })
      );
      return true;
    }

    await commandObject.command(message, settings, callbackServerSettings);
    return true;
  }

  if (conversationCommands[commandName] !== undefined) {
    const commandObject = conversationCommands[commandName];

    if (
      commandObject.isAdminCommand &&
      adminContext !== null &&
      adminContext.isAdminMessage === false
    ) {
      await vk.messagesSend(
        peerId,
        phrase("common_commandAvailableForAdminsOnly", { commandName })
      );
      return true;
    }

    if (commandObject.isAdminCommand && adminContext === null) {
      await vk.messagesSend(
        peerId,
        phrase("common_needPermissionsToUseAdminCommands", { commandName })
      );
      return true;
    }

    await commandObject.command(message, settings);
    return true;
  }

  if (conversationCommandsWithAdminContext[commandName] !== undefined) {
    const commandObject = conversationCommandsWithAdminContext[commandName];

    if (adminContext === null) {
      await vk.messagesSend(
        peerId,
        phrase("common_botNeedsToBeAdmin", { commandName })
      );
      return true;
    }

    if (commandObject.isAdminCommand && adminContext.isAdminMessage === false) {
      await vk.messagesSend(
        peerId,
        phrase("common_commandAvailableForAdminsOnly", { commandName })
      );
      return true;
    }

    await commandObject.command(message, settings, adminContext);
    return true;
  }

  if (isPrivateMessageCommandWithNameExist(commandName)) {
    await vk.messagesSend(
      peerId,
      phrase("common_commandAvailableInThePrivateChatOnly", { commandName })
    );
    return true;
  }

  if (settings.actionlessModes.ignoreUnknownCommands === null) {
    await vk.messagesSend(peerId, phrase("common_unknownCommand"));
    return true;
  }

  return false;
};

export default handleConversationMessage;
