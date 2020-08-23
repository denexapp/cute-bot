import { actionlessModes, callbackConversationCommands, callbackModes, conversationCommands, modes, privateMessageCommands, upcastToActionlessModeName, upcastToCallbackModeName, upcastToModeName } from '../commands'
import { ChatSettings } from './database/getChatSettings'
import setChatSettings from './database/setChatSettings'
import { CallbackServerSettings } from './getCallbackServerSettings'
import phrase from './localization/phrase'
import vk from './vk'
import { Message } from './vkCallbackDecoders/messageNewDecoder'

const isPrivateMessageCommandWithNameExist = (name: string) => (
  Object.keys(privateMessageCommands).some(commandName => commandName === name)
)

const handleConversationMessage = async (
  message: Message,
  commandName: string,
  settings: ChatSettings,
  callbackServerSettings: CallbackServerSettings | null,
  isAdminMessage: boolean | null
) => {
  const { peer_id: peerId, from_id: fromId } = message

  if (settings.actionlessModes.ignoreUsers) {
    if (isAdminMessage === null) {
      await vk.messagesSend(peerId, phrase('common_needPermissionsToReactToCommands'))
      return
    } else if (isAdminMessage === false) {
      return
    }
  }

  if (callbackModes[commandName] !== undefined) {
    const commandObject = callbackModes[commandName]

    if (isAdminMessage === false) {
      await vk.messagesSend(peerId, phrase('common_modeAvailableForAdminsOnly', { commandName }))
      return
    } else if (isAdminMessage === null) {
      await vk.messagesSend(peerId, phrase('common_needPermissionsToControlModes', { commandName }))
      return
    }

    const callbackModeName = upcastToCallbackModeName(commandName)
    const newValue = settings.callbackModes[callbackModeName] === null ? true : null

    if (newValue === true && callbackServerSettings === null) {
      await vk.messagesSend(peerId, phrase('common_modeRequiresCallbackServer', { commandName }))
      return
    }

    await setChatSettings(peerId, {
      callbackModes: {
        [callbackModeName]: newValue
      }
    })

    if (newValue === true) {
      const enabledText = phrase(commandObject.enabledText)
      await vk.messagesSend(peerId, phrase('common_modeEnabled', { commandName, enabledText }))
    } else {
      const disabledText = phrase(commandObject.disabledText)
      await vk.messagesSend(peerId, phrase('common_modeDisabled', { commandName, disabledText }))
    }

    return
  }

  if (actionlessModes[commandName] !== undefined) {
    const commandObject = actionlessModes[commandName]

    if (isAdminMessage === false) {
      await vk.messagesSend(peerId, phrase('common_modeAvailableForAdminsOnly', { commandName }))
      return
    } else if (isAdminMessage === null) {
      await vk.messagesSend(peerId, phrase('common_needPermissionsToControlModes', { commandName }))
      return
    }

    const modeName = upcastToActionlessModeName(commandName)

    await setChatSettings(peerId, {
      actionlessModes: {
        [modeName]: settings.actionlessModes[modeName] === null ? true : null
      }
    })

    if (settings.actionlessModes[modeName] === null) {
      const enabledText = phrase(commandObject.enabledText)
      await vk.messagesSend(peerId, phrase('common_modeEnabled', { commandName, enabledText }))
    } else {
      const disabledText = phrase(commandObject.disabledText)
      await vk.messagesSend(peerId, phrase('common_modeDisabled', { commandName, disabledText }))
    }

    return
  }

  if (modes[commandName] !== undefined) {
    const commandObject = modes[commandName]

    if (isAdminMessage === false) {
      await vk.messagesSend(peerId, phrase('common_modeAvailableForAdminsOnly', { commandName }))
      return
    } else if (isAdminMessage === null) {
      await vk.messagesSend(peerId, phrase('common_needPermissionsToControlModes', { commandName }))
      return
    }

    const modeName = upcastToModeName(commandName)

    await setChatSettings(peerId, {
      modes: {
        [modeName]: settings.modes[modeName] === null ? true : null
      }
    })

    if (settings.modes[modeName] === null) {
      const enabledText = phrase(commandObject.enabledText)
      await vk.messagesSend(peerId, phrase('common_modeEnabled', { commandName, enabledText }))
    } else {
      const disabledText = phrase(commandObject.disabledText)
      await vk.messagesSend(peerId, phrase('common_modeDisabled', { commandName, disabledText }))
    }

    return
  }

  if (callbackConversationCommands[commandName] !== undefined) {
    const commandObject = callbackConversationCommands[commandName]

    if (commandObject.isAdminCommand && isAdminMessage === false) {
      await vk.messagesSend(peerId, phrase('common_commandAvailableForAdminsOnly', { commandName }))
      return
    }

    if (commandObject.isAdminCommand && isAdminMessage === null) {
      await vk.messagesSend(peerId, phrase('common_needPermissionsToUseAdminCommands', { commandName }))
      return
    }

    if (callbackServerSettings === null) {
      await vk.messagesSend(peerId, phrase('common_commandRequiresCallbackServer', { commandName }))
      return
    }

    await commandObject.command(message, settings, callbackServerSettings)
    return
  }

  if (conversationCommands[commandName] !== undefined) {
    const commandObject = conversationCommands[commandName]

    if (commandObject.isAdminCommand && isAdminMessage === false) {
      await vk.messagesSend(peerId, phrase('common_commandAvailableForAdminsOnly', { commandName }))
      return
    }

    if (commandObject.isAdminCommand && isAdminMessage === null) {
      await vk.messagesSend(peerId, phrase('common_needPermissionsToUseAdminCommands', { commandName }))
      return
    }

    await commandObject.command(message, settings)
    return
  }

  if (isPrivateMessageCommandWithNameExist(commandName)) {
    await vk.messagesSend(peerId, phrase('common_commandAvailableInThePrivateChatOnly', { commandName }))
    return
  }

  if (settings.actionlessModes.ignoreUnknownCommands === null) {
    await vk.messagesSend(peerId, phrase('common_unknownCommand'))
  }
}

export default handleConversationMessage